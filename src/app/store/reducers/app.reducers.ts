import {Action} from 'rxjs/internal/scheduler/Action';

import {createReducer, on} from '@ngrx/store';

import * as AppActions from '../actions/app.actions';
import {AppState} from '../state/app-state.model';

const initialState: AppState = {
  apps: null,
  selectedAppId_Store: null,
  selectedAppId_Library: null,
  librarySearchText: ''
};

const reducer = createReducer(
  initialState,
  on(AppActions.loadApps, state => ({
    ...state,
    apps: {
      isLoading: true,
      data: null,
      error: null
    }
  })),
  on(AppActions.loadAppsSuccessful, (state, { apps }) => ({
    ...state,
    apps: {
      isLoading: false,
      data: apps,
      error: null
    }
  })),
  on(AppActions.loadAppsError, (state, { error }) => ({
    ...state,
    apps: {
      isLoading: false,
      data: null,
      error
    }
  })),
  on(AppActions.selectApp_Store, (state, { appId }) => ({
    ...state,
    selectedAppId_Store: appId
  })),
  on(AppActions.deselectApp_Store, state => ({
    ...state,
    selectedAppId_Store: null
  })),
  on(AppActions.selectApp_Library, (state, { appId }) => ({
    ...state,
    selectedAppId_Library: appId
  })),
  on(AppActions.deselectApp_Library, state => ({
    ...state,
    selectedAppId_Library: null
  })),
  on(AppActions.setLibrarySearchText, (state, { text }) => ({
    ...state,
    librarySearchText: text
  })),
);

// @ts-ignore
export function appReducer(state: AppState | undefined, action: Action) {
  return reducer(state, action);
}
