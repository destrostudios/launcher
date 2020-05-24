import {createAction, props} from '@ngrx/store';

import {PlainCredentials} from '../../model/plain-credentials.model';
import {SafeCredentials} from '../../model/safe-credentials.model';
import {Registration} from '../../model/registration.model';
import {User} from '../../model/user.model';

// tslint:disable:max-line-length
export const register = createAction('[User] Register', props<{ registration: Registration }>());
export const registrationSuccessful = createAction('[User] Registration successful', props<{ registration: Registration }>());
export const registrationError = createAction('[User] Registration error', props<{ error: any }>());
export const startLoginProcess = createAction('[User] Start login process', props<{ plainCredentials: PlainCredentials }>());
export const startLoginProcessSuccessful = createAction('[User] Start login process successful', props<{ plainCredentials: PlainCredentials, saltClient: string }>());
export const startLoginProcessError = createAction('[User] Start login process error', props<{ error: any }>());
export const login = createAction('[User] Login', props<{ safeCredentials: SafeCredentials }>());
export const loginSuccessful = createAction('[User] Login successful', props<{ sessionId: string }>());
export const loginError = createAction('[User] Login error', props<{ error: any }>());
export const loadUser = createAction('[User] Load user');
export const userLoaded = createAction('[User] User loaded', props<{ user: User }>());
export const userError = createAction('[User] User error', props<{ error: any }>());
export const logout = createAction('[User] Logout');
export const addAppToAccount = createAction('[User] Add app to account', props<{ appId: number }>());
export const addAppToAccountSuccessful = createAction('[User] Add app to account successful');
export const addAppToAccountError = createAction('[User] Add app to account error', props<{ error: any }>());
export const removeAppFromAccount = createAction('[User] Remove app from account', props<{ appId: number }>());
export const removeAppFromAccountSuccessful = createAction('[User] Remove app from account successful');
export const removeAppFromAccountError = createAction('[User] Remove app from account error', props<{ error: any }>());
// tslint:enable:max-line-length
