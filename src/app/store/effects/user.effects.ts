import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, withLatestFrom } from 'rxjs/operators';

import { AppHttpService } from '../../core/services/app-http.service';
import { UserHttpService } from '../../core/services/user-http.service';
import { generateSalt, hashSecret } from '../../core/util/hash.util';
import * as UserActions from '../actions/user.actions';
import {
  getAuthenticationEmailSecret,
  getAuthenticationLogin,
  getAuthenticationPassword,
  getAuthTokenUserId,
  getSaltClient,
} from '../selectors/user.selectors';

@Injectable()
export class UserEffects {
  constructor(
    private actions: Actions,
    private store: Store,
    private userHttpService: UserHttpService,
    private appHttpService: AppHttpService,
  ) {}

  register = createEffect(() =>
    this.actions.pipe(
      ofType(UserActions.register),
      switchMap(({ login, email, password }) => {
        const saltClient = generateSalt();
        const clientHashedPassword = hashSecret(password, saltClient);
        return this.userHttpService
          .register({
            login,
            email,
            saltClient,
            clientHashedPassword,
          })
          .pipe(
            map(() => UserActions.registrationSuccessful()),
            catchError((error) => of(UserActions.registrationError({ error }))),
          );
      }),
    ),
  );

  startLoginProcess = createEffect(() =>
    this.actions.pipe(
      ofType(UserActions.startLoginProcess),
      switchMap(({ login, password }) =>
        this.userHttpService.getSaltClient(login).pipe(
          map((saltClient) =>
            UserActions.startLoginProcessSuccessful({ saltClient }),
          ),
          catchError((error) =>
            of(UserActions.startLoginProcessError({ error })),
          ),
        ),
      ),
    ),
  );

  loginAfterSaltClientReceived = createEffect(() =>
    this.actions.pipe(
      ofType(UserActions.startLoginProcessSuccessful),
      map(() => UserActions.login()),
    ),
  );

  login = createEffect(() =>
    this.actions.pipe(
      ofType(UserActions.login),
      withLatestFrom(
        this.store.select(getAuthenticationLogin),
        this.store.select(getAuthenticationPassword),
        this.store.select(getSaltClient),
      ),
      switchMap(([_, login, password, saltClient]) => {
        const clientHashedPassword = hashSecret(password, saltClient);
        return this.userHttpService.login({ login, clientHashedPassword }).pipe(
          map((authToken) => UserActions.loginSuccessful({ authToken })),
          catchError((error) => of(UserActions.loginError({ error }))),
        );
      }),
    ),
  );

  sendEmailConfirmationEmail = createEffect(() =>
    this.actions.pipe(
      ofType(UserActions.sendEmailConfirmationEmail),
      withLatestFrom(this.store.select(getAuthenticationLogin)),
      switchMap(([_, login]) =>
        this.userHttpService.sendEmailConfirmationEmail(login).pipe(
          map(() => UserActions.sendEmailConfirmationEmailSuccessful()),
          catchError((error) =>
            of(UserActions.sendEmailConfirmationEmailError({ error })),
          ),
        ),
      ),
    ),
  );

  confirmEmail = createEffect(() =>
    this.actions.pipe(
      ofType(UserActions.confirmEmail),
      withLatestFrom(this.store.select(getAuthenticationLogin)),
      switchMap(([{ emailSecret }, login]) =>
        this.userHttpService.confirmEmail(login, emailSecret).pipe(
          map(() => UserActions.confirmEmailSuccessful()),
          catchError((error) => of(UserActions.confirmEmailError({ error }))),
        ),
      ),
    ),
  );

  loginAfterConfirmEmail = createEffect(() =>
    this.actions.pipe(
      ofType(UserActions.confirmEmailSuccessful),
      withLatestFrom(
        this.store.select(getAuthenticationLogin),
        this.store.select(getAuthenticationPassword),
      ),
      map(([_, login, password]) =>
        UserActions.startLoginProcess({ login, password }),
      ),
    ),
  );

  sendPasswordResetEmail = createEffect(() =>
    this.actions.pipe(
      ofType(UserActions.sendPasswordResetEmail),
      switchMap(({ login }) =>
        this.userHttpService.sendPasswordResetEmail(login).pipe(
          map(() => UserActions.sendPasswordResetEmailSuccessful()),
          catchError((error) =>
            of(UserActions.sendPasswordResetEmailError({ error })),
          ),
        ),
      ),
    ),
  );

  startResetPasswordProcess = createEffect(() =>
    this.actions.pipe(
      ofType(UserActions.startResetPasswordProcess),
      withLatestFrom(this.store.select(getAuthenticationLogin)),
      switchMap(([_, login]) =>
        this.userHttpService.getSaltClient(login).pipe(
          map((saltClient) =>
            UserActions.startResetPasswordProcessSuccessful({ saltClient }),
          ),
          catchError((error) =>
            of(UserActions.startResetPasswordProcessError({ error })),
          ),
        ),
      ),
    ),
  );

  resetPassword = createEffect(() =>
    this.actions.pipe(
      ofType(UserActions.startResetPasswordProcessSuccessful),
      withLatestFrom(
        this.store.select(getAuthenticationLogin),
        this.store.select(getAuthenticationPassword),
        this.store.select(getAuthenticationEmailSecret),
      ),
      switchMap(([{ saltClient }, login, password, emailSecret]) => {
        const clientHashedPassword = hashSecret(password, saltClient);
        return this.userHttpService
          .resetPassword(login, { emailSecret, clientHashedPassword })
          .pipe(
            map(() => UserActions.resetPasswordSuccessful()),
            catchError((error) =>
              of(UserActions.resetPasswordError({ error })),
            ),
          );
      }),
    ),
  );

  reloadUser = createEffect(() =>
    this.actions.pipe(
      ofType(
        UserActions.loginSuccessful,
        UserActions.addAppToAccountSuccessful,
        UserActions.removeAppFromAccountSuccessful,
      ),
      map(() => UserActions.loadUser()),
    ),
  );

  loadUser = createEffect(() =>
    this.actions.pipe(
      ofType(UserActions.loadUser),
      withLatestFrom(this.store.select(getAuthTokenUserId)),
      switchMap(([_, userId]) =>
        this.userHttpService.getUser(userId).pipe(
          map((user) => UserActions.userLoaded({ user })),
          catchError((error) => of(UserActions.userError({ error }))),
        ),
      ),
    ),
  );

  addAppToAccount = createEffect(() =>
    this.actions.pipe(
      ofType(UserActions.addAppToAccount),
      switchMap(({ appId }) =>
        this.appHttpService.addToAccount(appId).pipe(
          map(() => UserActions.addAppToAccountSuccessful()),
          catchError((error) =>
            of(UserActions.addAppToAccountError({ error })),
          ),
        ),
      ),
    ),
  );

  removeAppFromAccount = createEffect(() =>
    this.actions.pipe(
      ofType(UserActions.removeAppFromAccount),
      switchMap(({ appId }) =>
        this.appHttpService.removeFromAccount(appId).pipe(
          map(() => UserActions.removeAppFromAccountSuccessful()),
          catchError((error) =>
            of(UserActions.removeAppFromAccountError({ error })),
          ),
        ),
      ),
    ),
  );
}
