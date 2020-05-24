import {Injectable} from '@angular/core';

import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {EMPTY, of} from 'rxjs';
import {map, catchError, switchMap, withLatestFrom} from 'rxjs/operators';

import {AppHttpService} from '../../core/services/app-http/app-http.service';
import {getApp, getPreselectedApp} from '../../core/util/app/app.util';
import * as AppActions from '../actions/app.actions';
import * as UserActions from '../actions/user.actions';
import {AppState} from '../state/app-state.model';
import {getDisplayedLibraryApps, getOwnedApps, isSelectedAppOwned_Library} from '../selectors/aggregation.selectors';
import {getSelectedApp_Library} from '../selectors/app.selectors';

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
