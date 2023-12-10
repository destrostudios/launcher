import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import {
  catchError,
  mergeMap,
  map,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';

import { AppHttpService } from '../../core/services/app-http.service';
import { IpcService } from '../../core/services/ipc.service';
import {
  getApp,
  getLocalApp,
  getOutdatedAppFiles,
  getPreselectedApp,
} from '../../core/util/app.util';
import { LocalAppVersion } from '../../interfaces/local-app-version.enum';
import * as AppActions from '../actions/app.actions';
import * as UserActions from '../actions/user.actions';
import { getDisplayedLibraryApps } from '../selectors/aggregation.selectors';
import {
  getApps,
  getLocalApps,
  getSelectedApp_Library,
  getStartingAppId,
} from '../selectors/app.selectors';
import { getAuthToken } from '../selectors/user.selectors';

@Injectable()
export class AppEffects {
  constructor(
    private actions: Actions,
    private store: Store,
    private appHttpService: AppHttpService,
    private ipcService: IpcService,
  ) {
    this.ipcService.on(
      'appFilesCompared',
      (event, appId, outdatedFileIds, localFilesToBeDeleted) => {
        this.store.dispatch(
          AppActions.setAppCompared({
            appId,
            outdatedFileIds,
            localFilesToBeDeleted,
          }),
        );
      },
    );
    this.ipcService.on(
      'appFilesUpdateProgress',
      (event, appId, updateProgress) => {
        this.store.dispatch(
          AppActions.setUpdateProgress({ appId, updateProgress }),
        );
      },
    );
    this.ipcService.on('appFilesUpdateError', (event, appId, error) => {
      // TODO: Store and display error
      console.error(error);
      this.store.dispatch(AppActions.setUpdateError({ appId }));
    });
    this.ipcService.on('appFilesUpdated', (event, appId) => {
      this.store.dispatch(AppActions.setUpdateFinished({ appId }));
    });
  }

  loadApps = createEffect(() =>
    this.actions.pipe(
      ofType(AppActions.loadApps),
      switchMap(() =>
        this.appHttpService.getApps().pipe(
          map((apps) => AppActions.loadAppsSuccessful({ apps })),
          catchError((error) => of(AppActions.loadAppsError({ error }))),
        ),
      ),
    ),
  );

  loadAppFilesAfterAppsLoaded = createEffect(() =>
    this.actions.pipe(
      ofType(AppActions.loadAppsSuccessful),
      switchMap(({ apps }) =>
        apps.map((app) => AppActions.loadAppFiles({ appId: app.id })),
      ),
    ),
  );

  loadAppFilesWhenStarting = createEffect(() =>
    this.actions.pipe(
      ofType(AppActions.startApp),
      map(({ appId }) => AppActions.loadAppFiles({ appId })),
    ),
  );

  loadAppFiles = createEffect(() =>
    this.actions.pipe(
      ofType(AppActions.loadAppFiles),
      mergeMap(({ appId }) =>
        this.appHttpService.getAppFiles(appId).pipe(
          map((appFilesResponse) =>
            AppActions.loadAppFilesSuccessful({ appId, appFilesResponse }),
          ),
          catchError((error) =>
            of(AppActions.loadAppFilesError({ appId, error })),
          ),
        ),
      ),
    ),
  );

  cancelAppStartOnLoadingAppFilesError = createEffect(() =>
    this.actions.pipe(
      ofType(AppActions.loadAppFilesError),
      withLatestFrom(this.store.select(getStartingAppId)),
      switchMap(([{ appId }, startingAppId]) => {
        if (appId === startingAppId) {
          return of(AppActions.setAppNotStarting());
        }
        return EMPTY;
      }),
    ),
  );

  compareLocalAppFilesToAppFiles = createEffect(
    () =>
      this.actions.pipe(
        ofType(AppActions.loadAppFilesSuccessful),
        withLatestFrom(this.store.select(getApps)),
        switchMap(([{ appId, appFilesResponse }, apps]) => {
          const app = getApp(apps, appId);
          this.ipcService.send('compareAppFiles', app, appFilesResponse);
          return EMPTY;
        }),
      ),
    { dispatch: false },
  );

  updateApp = createEffect(
    () =>
      this.actions.pipe(
        ofType(AppActions.updateApp),
        withLatestFrom(
          this.store.select(getApps),
          this.store.select(getLocalApps),
        ),
        switchMap(([{ appId }, apps, localApps]) => {
          const app = getApp(apps, appId);
          const localApp = getLocalApp(localApps, appId);
          const outdatedFiles = getOutdatedAppFiles(localApp);
          this.ipcService.send(
            'updateAppFiles',
            app,
            outdatedFiles,
            localApp.localFilesToBeDeleted,
          );
          return EMPTY;
        }),
      ),
    { dispatch: false },
  );

  cancelAppStartWhenNotUpToDate = createEffect(() =>
    this.actions.pipe(
      ofType(AppActions.setAppCompared),
      withLatestFrom(this.store.select(getStartingAppId)),
      switchMap(([{ appId, outdatedFileIds }, startingAppId]) => {
        if (appId === startingAppId && outdatedFileIds.length > 0) {
          return of(AppActions.setAppNotStarting());
        }
        return EMPTY;
      }),
    ),
  );

  allowAppStartWhenUpToDate = createEffect(() =>
    this.actions.pipe(
      ofType(AppActions.setAppCompared, AppActions.setUpdateFinished),
      withLatestFrom(
        this.store.select(getStartingAppId),
        this.store.select(getLocalApps),
        this.store.select(getApps),
        this.store.select(getAuthToken),
      ),
      switchMap(([{ appId }, startingAppId, localApps, apps, authToken]) => {
        if (appId === startingAppId) {
          const localApp = getLocalApp(localApps, appId);
          if (localApp.version === LocalAppVersion.UP_TO_DATE) {
            const app = getApp(apps, startingAppId);
            this.ipcService.send('startApp', app, authToken);
            return of(AppActions.setAppNotStarting());
          }
        }
        return EMPTY;
      }),
    ),
  );

  deselectUndisplayedAppLibrary = createEffect(() =>
    this.actions.pipe(
      ofType(UserActions.userLoaded, AppActions.setLibrarySearchText),
      withLatestFrom(
        this.store.select(getSelectedApp_Library),
        this.store.select(getDisplayedLibraryApps),
      ),
      switchMap(([_, selectedApp_Library, displayedLibraryApps]) => {
        if (
          selectedApp_Library &&
          !displayedLibraryApps.includes(selectedApp_Library)
        ) {
          return of(AppActions.deselectApp_Library());
        }
        return EMPTY;
      }),
    ),
  );

  preselectAppLibrary = createEffect(() =>
    this.actions.pipe(
      ofType(
        UserActions.userLoaded,
        AppActions.loadAppsSuccessful,
        AppActions.deselectApp_Library,
        AppActions.setLibrarySearchText,
      ),
      withLatestFrom(
        this.store.select(getSelectedApp_Library),
        this.store.select(getDisplayedLibraryApps),
      ),
      switchMap(([_, selectedApp_Library, displayedApps]) => {
        if (!selectedApp_Library && displayedApps) {
          const preselectedApp = getPreselectedApp(displayedApps);
          if (preselectedApp != null) {
            return of(
              AppActions.selectApp_Library({ appId: preselectedApp.id }),
            );
          }
        }
        return EMPTY;
      }),
    ),
  );
}
