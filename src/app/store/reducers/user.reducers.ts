import { Action } from 'rxjs/internal/scheduler/Action';

import { createReducer, on } from '@ngrx/store';

import * as UserActions from '../actions/user.actions';
import { UserState } from '../state/user-state.interface';

const initialState: UserState = {
  authenticationLogin: null,
  authenticationPassword: null,
  authenticationEmailSecret: null,
  registration: null,
  saltClient: null,
  authToken: null,
  sendEmailConfirmationEmail: null,
  confirmEmail: null,
  sendPasswordResetEmail: null,
  resetPassword: null,
  user: null,
  currentUser: null,
  appAdditionToAccount: null,
  appRemovalFromAccount: null,
};

const reducer = createReducer(
  initialState,
  on(UserActions.register, (state) => ({
    ...state,
    registration: {
      isLoading: true,
      data: null,
      error: null,
    },
  })),
  on(UserActions.registrationSuccessful, (state) => ({
    ...state,
    registration: {
      isLoading: false,
      data: null,
      error: null,
    },
  })),
  on(UserActions.registrationError, (state, { error }) => ({
    ...state,
    registration: {
      isLoading: false,
      data: null,
      error,
    },
  })),
  on(UserActions.clearRegistration, (state) => ({
    ...state,
    registration: null,
  })),
  on(UserActions.startLoginProcess, (state, { login, password }) => ({
    ...state,
    authenticationLogin: login,
    authenticationPassword: password,
    saltClient: {
      isLoading: true,
      data: null,
      error: null,
    },
  })),
  on(UserActions.startLoginProcessSuccessful, (state, { saltClient }) => ({
    ...state,
    saltClient: {
      isLoading: false,
      data: saltClient,
      error: null,
    },
  })),
  on(UserActions.startLoginProcessError, (state, { error }) => ({
    ...state,
    saltClient: {
      isLoading: false,
      data: null,
      error,
    },
  })),
  on(UserActions.login, (state) => ({
    ...state,
    authToken: {
      isLoading: true,
      data: null,
      error: null,
    },
  })),
  on(UserActions.loginSuccessful, (state, { authToken }) => ({
    ...state,
    authToken: {
      isLoading: false,
      data: authToken,
      error: null,
    },
  })),
  on(UserActions.loginError, (state, { error }) => ({
    ...state,
    authToken: {
      isLoading: false,
      data: null,
      error,
    },
  })),
  on(UserActions.clearLogin, (state) => ({
    ...state,
    saltClient: null,
    authToken: state.authToken?.data ? state.authToken : null,
  })),
  on(UserActions.sendEmailConfirmationEmail, (state) => ({
    ...state,
    sendEmailConfirmationEmail: {
      isLoading: true,
      data: null,
      error: null,
    },
  })),
  on(UserActions.sendEmailConfirmationEmailSuccessful, (state) => ({
    ...state,
    sendEmailConfirmationEmail: {
      isLoading: false,
      data: null,
      error: null,
    },
  })),
  on(UserActions.sendEmailConfirmationEmailError, (state, { error }) => ({
    ...state,
    sendEmailConfirmationEmail: {
      isLoading: false,
      data: null,
      error,
    },
  })),
  on(UserActions.confirmEmail, (state) => ({
    ...state,
    confirmEmail: {
      isLoading: true,
      data: null,
      error: null,
    },
  })),
  on(UserActions.confirmEmailSuccessful, (state) => ({
    ...state,
    confirmEmail: {
      isLoading: false,
      data: null,
      error: null,
    },
  })),
  on(UserActions.confirmEmailError, (state, { error }) => ({
    ...state,
    confirmEmail: {
      isLoading: false,
      data: null,
      error,
    },
  })),
  on(UserActions.clearConfirmEmail, (state) => ({
    ...state,
    confirmEmail: null,
  })),
  on(UserActions.sendPasswordResetEmail, (state, { login }) => ({
    ...state,
    authenticationLogin: login,
    sendPasswordResetEmail: {
      isLoading: true,
      data: null,
      error: null,
    },
  })),
  on(UserActions.sendPasswordResetEmailSuccessful, (state) => ({
    ...state,
    sendPasswordResetEmail: {
      isLoading: false,
      data: null,
      error: null,
    },
  })),
  on(UserActions.sendPasswordResetEmailError, (state, { error }) => ({
    ...state,
    sendPasswordResetEmail: {
      isLoading: false,
      data: null,
      error,
    },
  })),
  on(UserActions.clearSendPasswordResetEmail, (state) => ({
    ...state,
    sendPasswordResetEmail: null,
  })),
  on(
    UserActions.startResetPasswordProcess,
    (state, { password, emailSecret }) => ({
      ...state,
      authenticationPassword: password,
      authenticationEmailSecret: emailSecret,
      saltClient: {
        isLoading: true,
        data: null,
        error: null,
      },
    }),
  ),
  on(
    UserActions.startResetPasswordProcessSuccessful,
    (state, { saltClient }) => ({
      ...state,
      saltClient: {
        isLoading: false,
        data: saltClient,
        error: null,
      },
    }),
  ),
  on(UserActions.startResetPasswordProcessError, (state, { error }) => ({
    ...state,
    saltClient: {
      isLoading: false,
      data: null,
      error,
    },
  })),
  on(UserActions.resetPassword, (state) => ({
    ...state,
    resetPassword: {
      isLoading: true,
      data: null,
      error: null,
    },
  })),
  on(UserActions.resetPasswordSuccessful, (state) => ({
    ...state,
    resetPassword: {
      isLoading: false,
      data: null,
      error: null,
    },
  })),
  on(UserActions.resetPasswordError, (state, { error }) => ({
    ...state,
    resetPassword: {
      isLoading: false,
      data: null,
      error,
    },
  })),
  on(UserActions.clearResetPassword, (state) => ({
    ...state,
    saltClient: null,
    resetPassword: null,
  })),
  on(UserActions.loadUser, (state) => ({
    ...state,
    user: {
      isLoading: true,
      data: null,
      error: null,
    },
  })),
  on(UserActions.userLoaded, (state, { user }) => ({
    ...state,
    user: {
      isLoading: false,
      data: user,
      error: null,
    },
    currentUser: user,
  })),
  on(UserActions.userError, (state, { error }) => ({
    ...state,
    user: {
      isLoading: false,
      data: null,
      error,
    },
  })),
  on(UserActions.logout, (state) => ({
    ...state,
    authenticationLogin: null,
    saltClient: null,
    authToken: null,
    user: null,
    currentUser: null,
  })),
  on(UserActions.addAppToAccount, (state) => ({
    ...state,
    appAdditionToAccount: {
      isLoading: true,
      data: null,
      error: null,
    },
  })),
  on(UserActions.addAppToAccountSuccessful, (state) => ({
    ...state,
    appAdditionToAccount: {
      isLoading: false,
      data: null,
      error: null,
    },
  })),
  on(UserActions.addAppToAccountError, (state, { error }) => ({
    ...state,
    appAdditionToAccount: {
      isLoading: false,
      data: null,
      error,
    },
  })),
  on(UserActions.removeAppFromAccount, (state) => ({
    ...state,
    appRemovalFromAccount: {
      isLoading: true,
      data: null,
      error: null,
    },
  })),
  on(UserActions.removeAppFromAccountSuccessful, (state) => ({
    ...state,
    appRemovalFromAccount: {
      isLoading: false,
      data: null,
      error: null,
    },
  })),
  on(UserActions.removeAppFromAccountError, (state, { error }) => ({
    ...state,
    appRemovalFromAccount: {
      isLoading: false,
      data: null,
      error,
    },
  })),
);

// @ts-ignore
export function userReducer(state: UserState | undefined, action: Action) {
  return reducer(state, action);
}
