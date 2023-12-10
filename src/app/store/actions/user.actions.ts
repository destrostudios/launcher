import { createAction, props } from '@ngrx/store';

import { User } from '../../interfaces/user.interface';

export const register = createAction(
  '[User] Register',
  props<{ login: string; email: string; password: string }>(),
);
export const registrationSuccessful = createAction(
  '[User] Registration successful',
);
export const registrationError = createAction(
  '[User] Registration error',
  props<{ error: any }>(),
);
export const clearRegistration = createAction('[User] Clear registration');
export const startLoginProcess = createAction(
  '[User] Start login process',
  props<{ login: string; password: string }>(),
);
export const startLoginProcessSuccessful = createAction(
  '[User] Start login process successful',
  props<{ saltClient: string }>(),
);
export const startLoginProcessError = createAction(
  '[User] Start login process error',
  props<{ error: any }>(),
);
export const login = createAction('[User] Login');
export const loginSuccessful = createAction(
  '[User] Login successful',
  props<{ authToken: string }>(),
);
export const loginError = createAction(
  '[User] Login error',
  props<{ error: any }>(),
);
export const clearLogin = createAction('[User] Clear login');
export const sendEmailConfirmationEmail = createAction(
  '[User] Send email confirmation email',
);
export const sendEmailConfirmationEmailSuccessful = createAction(
  '[User] Send email confirmation email successful',
);
export const sendEmailConfirmationEmailError = createAction(
  '[User] Send email confirmation email error',
  props<{ error: any }>(),
);
export const confirmEmail = createAction(
  '[User] Confirm email',
  props<{ emailSecret: string }>(),
);
export const confirmEmailSuccessful = createAction(
  '[User] Confirm email successful',
);
export const confirmEmailError = createAction(
  '[User] Confirm email error',
  props<{ error: any }>(),
);
export const clearConfirmEmail = createAction('[User] Clear confirm email');
export const sendPasswordResetEmail = createAction(
  '[User] Send password reset email',
  props<{ login: string }>(),
);
export const sendPasswordResetEmailSuccessful = createAction(
  '[User] Send password reset email successful',
);
export const sendPasswordResetEmailError = createAction(
  '[User] Send password reset email error',
  props<{ error: any }>(),
);
export const clearSendPasswordResetEmail = createAction(
  '[User] Clear send password reset email',
);
export const startResetPasswordProcess = createAction(
  '[User] Start reset password process',
  props<{ password: string; emailSecret: string }>(),
);
export const startResetPasswordProcessSuccessful = createAction(
  '[User] Start reset password process successful',
  props<{ saltClient: string }>(),
);
export const startResetPasswordProcessError = createAction(
  '[User] Start reset password process error',
  props<{ error: any }>(),
);
export const resetPassword = createAction('[User] Reset password');
export const resetPasswordSuccessful = createAction(
  '[User] Reset password successful',
);
export const resetPasswordError = createAction(
  '[User] Reset password error',
  props<{ error: any }>(),
);
export const clearResetPassword = createAction('[User] Clear reset password');
export const loadUser = createAction('[User] Load user');
export const userLoaded = createAction(
  '[User] User loaded',
  props<{ user: User }>(),
);
export const userError = createAction(
  '[User] User error',
  props<{ error: any }>(),
);
export const logout = createAction('[User] Logout');
export const addAppToAccount = createAction(
  '[User] Add app to account',
  props<{ appId: number }>(),
);
export const addAppToAccountSuccessful = createAction(
  '[User] Add app to account successful',
);
export const addAppToAccountError = createAction(
  '[User] Add app to account error',
  props<{ error: any }>(),
);
export const removeAppFromAccount = createAction(
  '[User] Remove app from account',
  props<{ appId: number }>(),
);
export const removeAppFromAccountSuccessful = createAction(
  '[User] Remove app from account successful',
);
export const removeAppFromAccountError = createAction(
  '[User] Remove app from account error',
  props<{ error: any }>(),
);
