import { User } from '../../interfaces/user.interface';
import { HttpData } from './http-data.interface';

export interface UserState {
  readonly authenticationLogin: string;
  readonly authenticationPassword: string;
  readonly authenticationEmailSecret: string;
  readonly registration: HttpData<void>;
  readonly saltClient: HttpData<string>;
  readonly authToken: HttpData<string>;
  readonly sendEmailConfirmationEmail: HttpData<void>;
  readonly confirmEmail: HttpData<void>;
  readonly sendPasswordResetEmail: HttpData<void>;
  readonly resetPassword: HttpData<void>;
  readonly user: HttpData<User>;
  readonly currentUser: User;
  readonly appAdditionToAccount: HttpData<void>;
  readonly appRemovalFromAccount: HttpData<void>;
}
