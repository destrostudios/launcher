import {createFeatureSelector, createSelector} from '@ngrx/store';

import {getApp} from '../../core/util/app/app.util';
import {AppState} from '../state/app-state.model';

const getUserState = createFeatureSelector<AppState>('app');

export const areAppsLoading = createSelector(
  getUserState, state => state.apps ? state.apps.isLoading : null
);

export const getApps = createSelector(
  getUserState, state => state.apps ? state.apps.data : null
);

export const getSelectedApp_Store = createSelector(
  getUserState, state => (state.apps && state.apps.data) ? getApp(state.apps.data, state.selectedAppId_Store) : null
);

export const getSelectedApp_Library = createSelector(
  getUserState, state => (state.apps && state.apps.data) ? getApp(state.apps.data, state.selectedAppId_Library) : null
);

export const getLibrarySearchText = createSelector(
  getUserState, state => state.librarySearchText
);
