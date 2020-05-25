import {Action} from 'rxjs/internal/scheduler/Action';

import {createReducer, on} from '@ngrx/store';

import {updateLocalApps} from '../../core/util/app/app.util';
import {LocalAppVersion} from '../../model/local-app-version.enum';
import * as AppActions from '../actions/app.actions';
import {AppState} from '../state/app-state.model';

const initialState: AppState = {
  apps: null,
  localApps: null,
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
    },
    localApps: null
  })),
  on(AppActions.loadAppsSuccessful, (state, { apps }) => ({
    ...state,
    apps: {
      isLoading: false,
      data: apps,
      error: null
    },
    localApps: []
  })),
  on(AppActions.loadAppsError, (state, { error }) => ({
    ...state,
    apps: {
      isLoading: false,
      data: null,
      error
    },
    localApps: null
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
  on(AppActions.startApp, (state, { appId }) => ({
    ...state,
    localApps: updateLocalApps(state.localApps, appId, localApp => ({
      ...localApp,
      isStarting: true
    }))
  })),
  on(AppActions.loadAppFiles, (state, { appId }) => ({
    ...state,
    localApps: updateLocalApps(state.localApps, appId, localApp => ({
      ...localApp,
      version: LocalAppVersion.CHECKING_UPDATE,
      files: {
        isLoading: true,
        data: null,
        error: null
      }
    }))
  })),
  on(AppActions.loadAppFilesSuccessful, (state, { appId, appFiles }) => ({
    ...state,
    localApps: updateLocalApps(state.localApps, appId, localApp => ({
      ...localApp,
      files: {
        isLoading: false,
        data: appFiles,
        error: null
      }
    }))
  })),
  on(AppActions.loadAppFilesError, (state, { appId, error }) => ({
    ...state,
    localApps: updateLocalApps(state.localApps, appId, localApp => ({
      ...localApp,
      files: {
        isLoading: false,
        data: null,
        error
      }
    }))
  })),
  on(AppActions.setAppCompared, (state, { appId, outdatedFilePaths }) => ({
    ...state,
    localApps: updateLocalApps(state.localApps, appId, localApp => ({
      ...localApp,
      version: ((outdatedFilePaths.length > 0) ? LocalAppVersion.OUTDATED : LocalAppVersion.UP_TO_DATE),
      outdatedFilePaths
    }))
  })),
  on(AppActions.updateApp, (state, { appId }) => ({
    ...state,
    localApps: updateLocalApps(state.localApps, appId, localApp => ({
      ...localApp,
      version: LocalAppVersion.UPDATING,
      updateProgress: 0
    }))
  })),
  on(AppActions.setUpdateProgress, (state, { appId, updateProgress }) => ({
    ...state,
    localApps: updateLocalApps(state.localApps, appId, localApp => ({
      ...localApp,
      updateProgress
    }))
  })),
  on(AppActions.setUpdateFinished, (state, { appId }) => ({
    ...state,
    localApps: updateLocalApps(state.localApps, appId, localApp => ({
      ...localApp,
      version: LocalAppVersion.UP_TO_DATE,
      outdatedFilePaths: [],
      updateProgress: null
    }))
  })),
  on(AppActions.setAppStarted, (state, { appId }) => ({
    ...state,
    localApps: updateLocalApps(state.localApps, appId, localApp => ({
      ...localApp,
      isStarting: false
    }))
  })),
);

// @ts-ignore
export function appReducer(state: AppState | undefined, action: Action) {
  return reducer(state, action);
}
