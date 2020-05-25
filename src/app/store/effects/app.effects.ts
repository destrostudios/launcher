import {Injectable} from '@angular/core';

import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {EMPTY, of} from 'rxjs';
import {map, catchError, switchMap, withLatestFrom, flatMap} from 'rxjs/operators';

import {AppHttpService} from '../../core/services/app-http/app-http.service';
import {getApp, getLocalApp, getPreselectedApp} from '../../core/util/app/app.util';
import * as AppActions from '../actions/app.actions';
import * as UserActions from '../actions/user.actions';
import {getDisplayedLibraryApps} from '../selectors/aggregation.selectors';
import {getApps, getLocalApps, getSelectedApp_Library} from '../selectors/app.selectors';
import {AppState} from '../state/app-state.model';

@Injectable()
export class AppEffects {

  constructor(
    private actions: Actions,
    private appStore: Store<AppState>,
    private appHttpService: AppHttpService,
  ) {}

  loadApps = createEffect(() => this.actions.pipe(
    ofType(AppActions.loadApps),
    switchMap(() => this.appHttpService.getApps().pipe(
      map(apps => AppActions.loadAppsSuccessful({ apps })),
      catchError(error => of(AppActions.loadAppsError({ error })))
    ))
  ));

  startApp = createEffect(() => this.actions.pipe(
    ofType(AppActions.startApp),
    map(({ appId }) => AppActions.loadAppFiles({ appId }))
  ));

  loadAppFilesAfterAppsLoaded = createEffect(() => this.actions.pipe(
    ofType(AppActions.loadAppsSuccessful),
    switchMap(({ apps }) => apps.map(app => AppActions.loadAppFiles({ appId: app.id })))
  ));

  loadAppFilesWhenStarting = createEffect(() => this.actions.pipe(
    ofType(AppActions.startApp),
    map(({ appId }) => AppActions.loadAppFiles({ appId }))
  ));

  loadAppFiles = createEffect(() => this.actions.pipe(
    ofType(AppActions.loadAppFiles),
    flatMap(({ appId }) => this.appHttpService.getAppFiles(appId).pipe(
      map(appFiles => AppActions.loadAppFilesSuccessful({ appId, appFiles })),
      catchError(error => of(AppActions.loadAppFilesError({ appId, error })))
    ))
  ));

  compareLocalFilesToAppFiles = createEffect(() => this.actions.pipe(
    ofType(AppActions.loadAppFilesSuccessful),
    withLatestFrom(this.appStore.select(getApps)),
    switchMap(([{ appId, appFiles }, apps]) => {
      const app = getApp(apps, appId);
      console.log('Compare local files of app ' + app.name + ' to newest files (' + appFiles.length + ')');
      return EMPTY;
    })
  ));

  updateApp = createEffect(() => this.actions.pipe(
    ofType(AppActions.updateApp),
    withLatestFrom(this.appStore.select(getApps)),
    switchMap(([{ appId }, apps]) => {
      const app = getApp(apps, appId);
      console.log('Update app ' + app.name);
      return EMPTY;
    })
  ));

  allowAppStartWhenUpToDate = createEffect(() => this.actions.pipe(
    ofType(AppActions.setUpToDate),
    withLatestFrom(this.appStore.select(getLocalApps)),
    switchMap(([{ appId }, localApps]) => {
      const localApp = getLocalApp(localApps, appId);
      if (localApp.isStarting) {
        console.log('Start app ' + localApp.appId);
      }
      return EMPTY;
    })
  ));

  deselectUndisplayedAppLibrary = createEffect(() => this.actions.pipe(
    ofType(UserActions.userLoaded, AppActions.setLibrarySearchText),
    withLatestFrom(
      this.appStore.select(getSelectedApp_Library),
      this.appStore.select(getDisplayedLibraryApps)
    ),
    switchMap(([_, selectedApp_Library, displayedLibraryApps]) => {
      if (selectedApp_Library && (!displayedLibraryApps.includes(selectedApp_Library))) {
        return of(AppActions.deselectApp_Library());
      }
      return EMPTY;
    })
  ));

  preselectAppLibrary = createEffect(() => this.actions.pipe(
    ofType(UserActions.userLoaded, AppActions.loadAppsSuccessful, AppActions.deselectApp_Library, AppActions.setLibrarySearchText),
    withLatestFrom(
      this.appStore.select(getSelectedApp_Library),
      this.appStore.select(getDisplayedLibraryApps)
    ),
    switchMap(([_, selectedApp_Library, displayedApps]) => {
      if ((!selectedApp_Library) && displayedApps) {
        const preselectedApp = getPreselectedApp(displayedApps);
        if (preselectedApp != null) {
          return of(AppActions.selectApp_Library({ appId: preselectedApp.id }));
        }
      }
      return EMPTY;
    })
  ));
}
