import { createFeatureSelector, createSelector } from '@ngrx/store';

import { UserState } from '../state/user-state.model';

const getUserState = createFeatureSelector<UserState>('user');

export const isRegistrationLoading = createSelector(
  getUserState,
  (state) => state.registration && state.registration.isLoading,
);

export const getRegistrationErrorMessage = createSelector(
  getUserState,
  (state) => {
    if (state.registration && state.registration.error) {
      if (state.registration.error.status === 403) {
        return 'LOGIN_ALREADY_EXISTING';
      } else {
        return 'AN_UNEXPECTED_ERROR_OCCURED';
      }
    }
    return null;
  },
);

export const isSaltClientLoading = createSelector(
  getUserState,
  (state) => state.saltClient && state.saltClient.isLoading,
);

export const isSessionIdLoading = createSelector(
  getUserState,
  (state) => state.sessionId && state.sessionId.isLoading,
);

export const getLoginErrorMessage = createSelector(getUserState, (state) => {
  if (state.saltClient && state.saltClient.error) {
    if (state.saltClient.error.status === 404) {
      return 'LOGIN_NOT_FOUND';
    } else {
      return 'AN_UNEXPECTED_ERROR_OCCURED';
    }
  } else if (state.sessionId && state.sessionId.error) {
    if (state.sessionId.error.status === 403) {
      return 'WRONG_PASSWORD';
    } else {
      return 'AN_UNEXPECTED_ERROR_OCCURED';
    }
  } else if (state.user && state.user.error) {
    return 'AN_UNEXPECTED_ERROR_OCCURED';
  }
  return null;
});

export const getSessionId = createSelector(getUserState, (state) =>
  state.sessionId ? state.sessionId.data : null,
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
