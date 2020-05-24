import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {Actions, createEffect, ofType} from '@ngrx/effects';
import {TranslateService} from '@ngx-translate/core';
import {EMPTY} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

import * as AppActions from '../actions/app.actions';
import * as ConfigActions from '../actions/config.actions';
import * as NewsActions from '../actions/news.actions';
import * as UserActions from '../actions/user.actions';
import * as LayoutActions from '../actions/layout.actions';

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

  navigateToOfflineWhenOffline = createEffect(() => this.actions.pipe(
    ofType(ConfigActions.loadClientConfigsError, AppActions.loadAppsError, NewsActions.loadLatestNewsError),
    map(() => LayoutActions.navigate({ route: 'offline' })),
  ));

  navigateToHomeAfterLogin = createEffect(() => this.actions.pipe(
    ofType(UserActions.loginSuccessful),
    map(() => LayoutActions.navigate({ route: 'home' })),
  ));

  navigateToStartAfterLogout = createEffect(() => this.actions.pipe(
    ofType(UserActions.logout),
    map(() => LayoutActions.navigate({ route: '' })),
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
