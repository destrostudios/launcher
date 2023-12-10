import { createFeatureSelector, createSelector } from '@ngrx/store';

import { jwtDecode } from 'jwt-decode';

import { getErrorMessage } from '../../core/util/error.util';
import { UserState } from '../state/user-state.interface';

const getUserState = createFeatureSelector<UserState>('user');

export const getAuthenticationLogin = createSelector(
  getUserState,
  (state) => state.authenticationLogin,
);

export const getAuthenticationPassword = createSelector(
  getUserState,
  (state) => state.authenticationPassword,
);

export const getAuthenticationEmailSecret = createSelector(
  getUserState,
  (state) => state.authenticationEmailSecret,
);

export const isRegistrationLoading = createSelector(
  getUserState,
  (state) => state.registration && state.registration.isLoading,
);

export const getRegistrationErrorMessage = createSelector(
  getUserState,
  (state) =>
    state.registration?.error && getErrorMessage(state.registration.error),
);

export const isSaltClientLoading = createSelector(
  getUserState,
  (state) => state.saltClient && state.saltClient.isLoading,
);

export const getSaltClient = createSelector(
  getUserState,
  (state) => state.saltClient && state.saltClient.data,
);

export const isAuthTokenLoading = createSelector(
  getUserState,
  (state) => state.authToken && state.authToken.isLoading,
);

export const getLoginErrorMessage = createSelector(getUserState, (state) => {
  if (state.saltClient?.error) {
    return getErrorMessage(state.saltClient.error);
  } else if (state.authToken?.error) {
    return getErrorMessage(state.authToken.error);
  } else if (state.user?.error) {
    return getErrorMessage(state.user.error);
  }
  return null;
});

export const getAuthToken = createSelector(getUserState, (state) =>
  state.authToken ? state.authToken.data : null,
);

const getAuthTokenClaims = createSelector(getAuthToken, (authToken) =>
  authToken ? jwtDecode(authToken) : null,
);

export const getAuthTokenUserId = createSelector(
  getAuthTokenClaims,
  (authTokenClaims) => (authTokenClaims ? authTokenClaims['user']['id'] : null),
);

export const isSendEmailConfirmationEmailLoading = createSelector(
  getUserState,
  (state) => state.sendEmailConfirmationEmail?.isLoading,
);

export const isConfirmEmailLoading = createSelector(
  getUserState,
  (state) => state.confirmEmail?.isLoading,
);

export const getConfirmEmailErrorMessage = createSelector(
  getUserState,
  (state) => {
    if (state.confirmEmail?.error) {
      return getErrorMessage(state.confirmEmail.error);
    } else if (state.sendEmailConfirmationEmail?.error) {
      return getErrorMessage(state.sendEmailConfirmationEmail.error);
    }
    return null;
  },
);

export const isSendPasswordResetEmailLoading = createSelector(
  getUserState,
  (state) => state.sendPasswordResetEmail?.isLoading,
);

export const getSendPasswordResetEmailErrorMessage = createSelector(
  getUserState,
  (state) =>
    state.sendPasswordResetEmail?.error &&
    getErrorMessage(state.sendPasswordResetEmail.error),
);

export const isResetPasswordLoading = createSelector(
  getUserState,
  (state) => state.resetPassword?.isLoading,
);

export const getResetPasswordErrorMessage = createSelector(
  getUserState,
  (state) =>
    state.resetPassword?.error && getErrorMessage(state.resetPassword.error),
);

export const isUserLoading = createSelector(
  getUserState,
  (state) => state.user && state.user.isLoading,
);

export const getCurrentUser = createSelector(
  getUserState,
  (state) => state.currentUser,
);

export const getLogin = createSelector(getCurrentUser, (currentUser) =>
  currentUser ? currentUser.login : null,
);

export const getOwnedAppIds = createSelector(getCurrentUser, (currentUser) =>
  currentUser ? currentUser.ownedAppIds : null,
);

const isAppAdditionToAccountLoading = createSelector(
  getUserState,
  (state) => state.appAdditionToAccount && state.appAdditionToAccount.isLoading,
);

const isAppRemovalFromAccountLoading = createSelector(
  getUserState,
  (state) =>
    state.appRemovalFromAccount && state.appRemovalFromAccount.isLoading,
);

export const isAppAdditionToAccountIncludingUpdateLoading = createSelector(
  isAppAdditionToAccountLoading,
  isUserLoading,
  (appAdditionToAccountLoading, userLoading) =>
    appAdditionToAccountLoading || userLoading,
);

export const isAppRemovalFromAccountIncludingUpdateLoading = createSelector(
  isAppRemovalFromAccountLoading,
  isUserLoading,
  (appRemovalFromAccountLoading, userLoading) =>
    appRemovalFromAccountLoading || userLoading,
);
