import {createFeatureSelector, createSelector} from '@ngrx/store';

import {getApp, getLocalApp} from '../../core/util/app/app.util';
import {LocalAppVersion} from '../../model/local-app-version.enum';
import {AppState} from '../state/app-state.model';

const getUserState = createFeatureSelector<AppState>('app');

export const areAppsLoading = createSelector(
  getUserState, state => state.apps ? state.apps.isLoading : null
);

export const getApps = createSelector(
  getUserState, state => state.apps ? state.apps.data : null
);

export const getLocalApps = createSelector(
  getUserState, state => state.localApps
);

export const isSomeLocalAppUpdating = createSelector(
  getLocalApps, localApps => localApps ? localApps.some(localApp => localApp.version === LocalAppVersion.UPDATING) : null
);

export const getSelectedApp_Store = createSelector(
  getUserState, state => (state.apps && state.apps.data) ? getApp(state.apps.data, state.selectedAppId_Store) : null
);

export const getSelectedApp_Library = createSelector(
  getUserState, state => (state.apps && state.apps.data) ? getApp(state.apps.data, state.selectedAppId_Library) : null
);

const getSelectedApp_Library_LocalApp = createSelector(
  getSelectedApp_Library, getLocalApps, (selectedApp_Library, localApps) => {
    if ((!selectedApp_Library) || (!localApps)) {
      return null;
    }
    return getLocalApp(localApps, selectedApp_Library.id);
  }
);

export const getSelectedApp_Library_LocalVersion = createSelector(
  getSelectedApp_Library_LocalApp, localApp => localApp ? localApp.version : null
);

const getSelectedApp_Library_UpdateProgress = createSelector(
  getSelectedApp_Library_LocalApp, localApp => localApp ? localApp.updateProgress : null
);

export const getSelectedApp_Library_UpdateProgressText = createSelector(
  getSelectedApp_Library_UpdateProgress, updateProgress => ((updateProgress !== null) ? (100 * updateProgress).toFixed(1) + '%' : null)
);

export const getLibrarySearchText = createSelector(
  getUserState, state => state.librarySearchText
);
