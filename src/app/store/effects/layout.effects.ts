import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {Actions, createEffect, ofType} from '@ngrx/effects';
import {TranslateService} from '@ngx-translate/core';
import {EMPTY, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

import * as AppActions from '../actions/app.actions';
import * as ConfigActions from '../actions/config.actions';
import * as LayoutActions from '../actions/layout.actions';
import * as NewsActions from '../actions/news.actions';
import * as SelfUpdateActions from '../actions/self-update.actions';
import * as UserActions from '../actions/user.actions';

@Injectable()
export class LayoutEffects {

  constructor(
    private actions: Actions,
    private router: Router,
    private translateService: TranslateService
  ) {}

  setLanguage = createEffect(() => this.actions.pipe(
    ofType(LayoutActions.setLanguage),
    switchMap(({ language }) => {
      this.translateService.use(language);
      return EMPTY;
    }),
  ));

  navigateToOfflineWhenSelfUpdateError = createEffect(() => this.actions.pipe(
    ofType(SelfUpdateActions.setDownloaded),
    switchMap(({ isSelfUpdateDownloaded }) => {
      if (!isSelfUpdateDownloaded) {
        return of(LayoutActions.navigate({ route: 'offline' }));
      }
      return EMPTY;
    }),
  ));

  navigateToAuthenticationWhenNoSelfUpdateAvailable = createEffect(() => this.actions.pipe(
    ofType(SelfUpdateActions.setAvailable),
    switchMap(({ isSelfUpdateAvailable }) => {
      if (!isSelfUpdateAvailable) {
        return of(LayoutActions.navigate({ route: 'authentication' }));
      }
      return EMPTY;
    }),
  ));

  navigateToOfflineWhenCriticalApiError = createEffect(() => this.actions.pipe(
    ofType(
      ConfigActions.loadClientConfigsError,
      AppActions.loadAppsError,
      NewsActions.loadLatestNewsError,
      AppActions.loadAppFilesError
    ),
    map(() => LayoutActions.navigate({ route: 'offline' })),
  ));

  navigateToHomeAfterLogin = createEffect(() => this.actions.pipe(
    ofType(UserActions.loginSuccessful),
    map(() => LayoutActions.navigate({ route: 'home' })),
  ));

  navigateToAuthenticationAfterLogout = createEffect(() => this.actions.pipe(
    ofType(UserActions.logout),
    map(() => LayoutActions.navigate({ route: 'authentication' })),
  ));

  showAppAdditionToAccountError = createEffect(() => this.actions.pipe(
    ofType(UserActions.addAppToAccountError),
    map(() => LayoutActions.showAppAdditionToAccountError()),
  ));

  showAppRemovalFromAccountError = createEffect(() => this.actions.pipe(
    ofType(UserActions.removeAppFromAccountError),
    map(() => LayoutActions.showAppRemovalFromAccountError()),
  ));

  navigateToRoute = createEffect(() => this.actions.pipe(
    ofType(LayoutActions.navigate),
    switchMap(({ route }) => {
      this.router.navigate([route]);
      return EMPTY;
    }),
  ));
}
