import {createAction, props} from '@ngrx/store';

import {App} from '../../model/app.model';
import {AppFile} from '../../model/app-file.model';

export const loadApps = createAction('[App] Load apps');
export const loadAppsSuccessful = createAction('[App] Load apps successful', props<{ apps: App[] }>());
export const loadAppsError = createAction('[App] Load apps error', props<{ error: any }>());
export const selectApp_Store = createAction('[App] Select app (store)', props<{ appId: number }>());
export const deselectApp_Store = createAction('[App] Deselect app (store)');
export const selectApp_Library = createAction('[App] Select app (library)', props<{ appId: number }>());
export const deselectApp_Library = createAction('[App] Deselect app (library)');
export const setLibrarySearchText = createAction('[App] Set library search text', props<{ text: string }>());
export const startApp = createAction('[App] Start app', props<{ appId: number }>());
export const loadAppFiles = createAction('[App] Load app files', props<{ appId: number }>());
export const loadAppFilesSuccessful = createAction('[App] Load app files successful', props<{ appId: number, appFiles: AppFile[] }>());
export const loadAppFilesError = createAction('[App] Load app files error', props<{ appId: number, error: any }>());
export const setAppCompared = createAction('[App] Set app compared', props<{ appId: number, outdatedFileIds: string[] }>());
export const updateApp = createAction('[App] Update app', props<{ appId: number }>());
export const setUpdateProgress = createAction('[App] Set update progress', props<{ appId: number, updateProgress: number }>());
export const setUpdateFinished = createAction('[App] Set update finished', props<{ appId: number }>());
export const setAppStarted = createAction('[App] App started', props<{ appId: number }>());
