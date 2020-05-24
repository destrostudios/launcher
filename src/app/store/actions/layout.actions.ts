import {createAction, props} from '@ngrx/store';

export const setLanguage = createAction('[Layout] Set language', props<{ language: string }>());
export const navigate = createAction('[Layout] Navigate', props<{ route: string }>());
export const openLogin = createAction('[Layout] Open login');
export const openRegistration = createAction('[Layout] Open registration');
export const showAppAdditionToAccountError = createAction('[Layout] Show app addition to account error');
export const hideAppAdditionToAccountError = createAction('[Layout] Hide app addition to account error');
export const showAppRemovalFromAccountError = createAction('[Layout] Show app removal from account error');
export const hideAppRemovalFromAccountError = createAction('[Layout] Hide app removal from account error');
