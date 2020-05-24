import {createAction, props} from '@ngrx/store';

import {Configs} from '../../model/configs.model';

export const loadClientConfigs = createAction('[Config] Load client configs');
export const loadClientConfigsSuccessful = createAction('[User] Load client configs successful', props<{ configs: Configs }>());
export const loadClientConfigsError = createAction('[App] Load client configs error', props<{ error: any }>());
