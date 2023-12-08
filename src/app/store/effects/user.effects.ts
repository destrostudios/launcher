import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as bcrypt from 'bcryptjs';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import { AppHttpService } from '../../core/services/app-http.service';
import { UserHttpService } from '../../core/services/user-http.service';
import * as UserActions from '../actions/user.actions';

@Injectable()
export class UserEffects {
  constructor(
    private actions: Actions,
    private userHttpService: UserHttpService,
    private appHttpService: AppHttpService,
  ) {}

  register = createEffect(() =>
    this.actions.pipe(
      ofType(UserActions.register),
      switchMap(({ registration }) =>
        this.userHttpService.register(registration).pipe(
          map((_) => UserActions.registrationSuccessful({ registration })),
          catchError((error) => of(UserActions.registrationError({ error }))),
        ),
      ),
    ),
  );

  loginAfterRegistration = createEffect(() =>
    this.actions.pipe(
      ofType(UserActions.registrationSuccessful),
      map(({ registration }) =>
        UserActions.login({
          safeCredentials: {
            login: registration.login,
            hashedPassword: registration.hashedPassword,
          },
        }),
      ),
    ),
  );

  startLoginProcess = createEffect(() =>
    this.actions.pipe(
      ofType(UserActions.startLoginProcess),
      switchMap(({ plainCredentials }) =>
        this.userHttpService.getSaltClient(plainCredentials.login).pipe(
          map((saltClient) =>
            UserActions.startLoginProcessSuccessful({
              plainCredentials,
              saltClient,
            }),
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
      map(({ plainCredentials, saltClient }) => {
        const hashedPassword = bcrypt.hashSync(
          plainCredentials.password,
          saltClient,
        );
        return UserActions.login({
          safeCredentials: {
            login: plainCredentials.login,
            hashedPassword,
          },
        });
      }),
    ),
  );

  login = createEffect(() =>
    this.actions.pipe(
      ofType(UserActions.login),
      switchMap(({ safeCredentials }) =>
        this.userHttpService.login(safeCredentials).pipe(
          map((sessionId) => UserActions.loginSuccessful({ sessionId })),
          catchError((error) => of(UserActions.loginError({ error }))),
        ),
      ),
    ),
  );

  reloadUser = createEffect(() =>
    this.actions.pipe(
      ofType(
        UserActions.loginSuccessful,
        UserActions.addAppToAccountSuccessful,
        UserActions.removeAppFromAccountSuccessful,
      ),
      map((_) => UserActions.loadUser()),
    ),
  );

  loadUser = createEffect(() =>
    this.actions.pipe(
      ofType(UserActions.loadUser),
      switchMap(() =>
        this.userHttpService.getUser().pipe(
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

  loadAuthToken = createEffect(() =>
    this.actions.pipe(
      ofType(UserActions.loadAuthToken),
      switchMap(() =>
        this.userHttpService.getAuthToken().pipe(
          map((authToken) =>
            UserActions.loadAuthTokenSuccessful({ authToken }),
          ),
          catchError((error) => of(UserActions.loadAuthTokenError({ error }))),
        ),
      ),
    ),
  );
}
