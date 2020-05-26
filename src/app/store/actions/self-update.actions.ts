import {createAction, props} from '@ngrx/store';

export const setAvailable = createAction('[LauncherUpdate] Set available', props<{ isSelfUpdateAvailable: boolean }>());
export const setDownloaded = createAction('[LauncherUpdate] Set downloaded', props<{ isSelfUpdateDownloaded: boolean }>());
export const restartAndInstall = createAction('[LauncherUpdate] Restart and install');
