import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { getErrorCode } from '../../core/util/error.util';
import { ErrorCode } from '../../interfaces/error-code.enum';
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
    private translateService: TranslateService,
  ) {}

  setLanguage = createEffect(
    () =>
      this.actions.pipe(
        ofType(LayoutActions.setLanguage),
        switchMap(({ language }) => {
          this.translateService.use(language);
          return EMPTY;
        }),
      ),
    { dispatch: false },
  );

  navigateToOfflineWhenSelfUpdateError = createEffect(() =>
    this.actions.pipe(
      ofType(SelfUpdateActions.setDownloaded),
      switchMap(({ isSelfUpdateDownloaded }) => {
        if (!isSelfUpdateDownloaded) {
          return of(LayoutActions.navigate({ route: 'offline' }));
        }
        return EMPTY;
      }),
    ),
  );

  navigateToLoginWhenNoSelfUpdateAvailable = createEffect(() =>
    this.actions.pipe(
      ofType(SelfUpdateActions.setAvailable),
      switchMap(({ isSelfUpdateAvailable }) => {
        if (!isSelfUpdateAvailable) {
          return of(LayoutActions.navigate({ route: 'authentication/login' }));
        }
        return EMPTY;
      }),
    ),
  );

  navigateToOfflineWhenCriticalApiError = createEffect(() =>
    this.actions.pipe(
      ofType(
        ConfigActions.loadClientConfigsError,
        AppActions.loadAppsError,
        AppActions.loadAppFilesError,
        NewsActions.loadLatestNewsError,
      ),
      map(() => LayoutActions.navigate({ route: 'offline' })),
    ),
  );

  navigateToLoginAfterRegistrationOrPasswordReset = createEffect(() =>
    this.actions.pipe(
      ofType(
        UserActions.registrationSuccessful,
        UserActions.resetPasswordSuccessful,
      ),
      map(() => LayoutActions.navigate({ route: 'authentication/login' })),
    ),
  );

  navigateToConfirmEmailAfterEmailNotConfirmed = createEffect(() =>
    this.actions.pipe(
      ofType(UserActions.loginError),
      switchMap(({ error }) => {
        if (getErrorCode(error) === ErrorCode.EMAIL_NOT_CONFIRMED) {
          return of(
            LayoutActions.navigate({ route: 'authentication/confirmEmail' }),
          );
        }
        return EMPTY;
      }),
    ),
  );

  navigateToResetPasswordAfterSendResetPasswordEmailSuccessful = createEffect(
    () =>
      this.actions.pipe(
        ofType(UserActions.sendPasswordResetEmailSuccessful),
        map(() =>
          LayoutActions.navigate({ route: 'authentication/resetPassword' }),
        ),
      ),
  );

  navigateToHomeAfterLogin = createEffect(() =>
    this.actions.pipe(
      ofType(UserActions.loginSuccessful),
      map(() => LayoutActions.navigate({ route: 'home' })),
    ),
  );

  navigateToLoginAfterLogout = createEffect(() =>
    this.actions.pipe(
      ofType(UserActions.logout),
      map(() => LayoutActions.navigate({ route: 'authentication/login' })),
    ),
  );

  showAppAdditionToAccountError = createEffect(() =>
    this.actions.pipe(
      ofType(UserActions.addAppToAccountError),
      map(() => LayoutActions.showAppAdditionToAccountError()),
    ),
  );

  showAppRemovalFromAccountError = createEffect(() =>
    this.actions.pipe(
      ofType(UserActions.removeAppFromAccountError),
      map(() => LayoutActions.showAppRemovalFromAccountError()),
    ),
  );

  navigateToRoute = createEffect(
    () =>
      this.actions.pipe(
        ofType(LayoutActions.navigate),
        switchMap(({ route }) => {
          this.router.navigate([route]);
          return EMPTY;
        }),
      ),
    { dispatch: false },
  );
}
