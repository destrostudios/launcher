import {createAction, props} from '@ngrx/store';

import {App} from '../../model/app.model';

export const loadApps = createAction('[App] Load apps');
export const loadAppsSuccessful = createAction('[User] Load apps successful', props<{ apps: App[] }>());
export const loadAppsError = createAction('[App] Load apps error', props<{ error: any }>());
export const selectApp_Store = createAction('[App] Select app (store)', props<{ appId: number }>());
export const deselectApp_Store = createAction('[App] Deselect app (store)');
export const selectApp_Library = createAction('[App] Select app (library)', props<{ appId: number }>());
export const deselectApp_Library = createAction('[App] Deselect app (library)');
export const setLibrarySearchText = createAction('[Library] Set search text', props<{ text: string }>());
