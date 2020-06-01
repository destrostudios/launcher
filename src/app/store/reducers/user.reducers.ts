import {Action} from 'rxjs/internal/scheduler/Action';

import {createReducer, on} from '@ngrx/store';

import * as UserActions from '../actions/user.actions';
import {UserState} from '../state/user-state.model';

const initialState: UserState = {
  registration: null,
  saltClient: null,
  sessionId: null,
  user: null,
  currentUser: null,
  appAdditionToAccount: null,
  appRemovalFromAccount: null,
  authToken: null
};

const reducer = createReducer(
  initialState,
  on(UserActions.register, state => ({
    ...state,
    registration: {
      isLoading: true,
      data: null,
      error: null
    }
  })),
  on(UserActions.registrationSuccessful, state => ({
    ...state,
    registration: {
      isLoading: false,
      data: null,
      error: null
    }
  })),
  on(UserActions.registrationError, (state, { error }) => ({
    ...state,
    registration: {
      isLoading: false,
      data: null,
      error
    }
  })),
  on(UserActions.startLoginProcess, state => ({
    ...state,
    saltClient: {
      isLoading: true,
      data: null,
      error: null
    }
  })),
  on(UserActions.startLoginProcessSuccessful, (state, { saltClient }) => ({
    ...state,
    saltClient: {
      isLoading: false,
      data: saltClient,
      error: null
    }
  })),
  on(UserActions.startLoginProcessError, (state, { error }) => ({
    ...state,
    saltClient: {
      isLoading: false,
      data: null,
      error
    }
  })),
  on(UserActions.login, state => ({
    ...state,
    sessionId: {
      isLoading: true,
      data: null,
      error: null
    }
  })),
  on(UserActions.loginSuccessful, (state, { sessionId }) => ({
    ...state,
    sessionId: {
      isLoading: false,
      data: sessionId,
      error: null
    }
  })),
  on(UserActions.loginError, (state, { error }) => ({
    ...state,
    sessionId: {
      isLoading: false,
      data: null,
      error
    }
  })),
  on(UserActions.loadUser, state => ({
    ...state,
    user: {
      isLoading: true,
      data: null,
      error: null
    }
  })),
  on(UserActions.userLoaded, (state, { user }) => ({
    ...state,
    user: {
      isLoading: false,
      data: user,
      error: null
    },
    currentUser: user
  })),
  on(UserActions.userError, (state, { error }) => ({
    ...state,
    user: {
      isLoading: false,
      data: null,
      error
    }
  })),
  on(UserActions.logout, state => ({
    ...state,
    saltClient: null,
    sessionId: null,
    user: null,
    currentUser: null
  })),
  on(UserActions.addAppToAccount, state => ({
    ...state,
    appAdditionToAccount: {
      isLoading: true,
      data: null,
      error: null
    }
  })),
  on(UserActions.addAppToAccountSuccessful, state => ({
    ...state,
    appAdditionToAccount: {
      isLoading: false,
      data: null,
      error: null
    }
  })),
  on(UserActions.addAppToAccountError, (state, { error }) => ({
    ...state,
    appAdditionToAccount: {
      isLoading: false,
      data: null,
      error
    }
  })),
  on(UserActions.removeAppFromAccount, state => ({
    ...state,
    appRemovalFromAccount: {
      isLoading: true,
      data: null,
      error: null
    }
  })),
  on(UserActions.removeAppFromAccountSuccessful, state => ({
    ...state,
    appRemovalFromAccount: {
      isLoading: false,
      data: null,
      error: null
    }
  })),
  on(UserActions.removeAppFromAccountError, (state, { error }) => ({
    ...state,
    appRemovalFromAccount: {
      isLoading: false,
      data: null,
      error
    }
  })),
  on(UserActions.loadAuthToken, state => ({
    ...state,
    authToken: {
      isLoading: true,
      data: null,
      error: null
    }
  })),
  on(UserActions.loadAuthTokenSuccessful, (state, { authToken }) => ({
    ...state,
    authToken: {
      isLoading: false,
      data: authToken,
      error: null
    }
  })),
  on(UserActions.loadAuthTokenError, (state, { error }) => ({
    ...state,
    authToken: {
      isLoading: false,
      data: null,
      error
    }
  }))
);

// @ts-ignore
export function userReducer(state: UserState | undefined, action: Action) {
  return reducer(state, action);
}
