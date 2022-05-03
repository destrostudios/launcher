import {createAction, props} from '@ngrx/store';

import {App} from '../../model/app.model';
import {AppFilesResponse} from '../../model/app-files-response.model';

// tslint:disable:max-line-length
export const loadApps = createAction('[App] Load apps');
export const loadAppsSuccessful = createAction('[App] Load apps successful', props<{ apps: App[] }>());
export const loadAppsError = createAction('[App] Load apps error', props<{ error: any }>());
export const selectApp_Store = createAction('[App] Select app (store)', props<{ appId: number }>());
export const deselectApp_Store = createAction('[App] Deselect app (store)');
export const selectApp_Library = createAction('[App] Select app (library)', props<{ appId: number }>());
export const deselectApp_Library = createAction('[App] Deselect app (library)');
export const setLibrarySearchText = createAction('[App] Set library search text', props<{ text: string }>());
export const startApp = createAction('[App] Start app', props<{ appId: number }>());
export const setAppNotStarting = createAction('[App] Set app not starting');
export const loadAppFiles = createAction('[App] Load app files', props<{ appId: number }>());
export const loadAppFilesSuccessful = createAction('[App] Load app files successful', props<{ appId: number, appFilesResponse: AppFilesResponse }>());
export const loadAppFilesError = createAction('[App] Load app files error', props<{ appId: number, error: any }>());
export const setAppCompared = createAction('[App] Set app compared', props<{ appId: number, outdatedFileIds: string[], localFilesToBeDeleted: string[] }>());
export const updateApp = createAction('[App] Update app', props<{ appId: number }>());
export const setUpdateProgress = createAction('[App] Set update progress', props<{ appId: number, updateProgress: number }>());
export const setUpdateError = createAction('[App] Set update error', props<{ appId: number }>());
export const setUpdateFinished = createAction('[App] Set update finished', props<{ appId: number }>());
export const toggleHiddenAppsInStore = createAction('[App] Toggle hidden apps in store');
// tslint:enable:max-line-length
