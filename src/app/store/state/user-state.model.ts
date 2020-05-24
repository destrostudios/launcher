import {User} from '../../model/user.model';
import {HttpData} from './http-data.model';

export interface UserState {
  readonly registration: HttpData<void>;
  readonly saltClient: HttpData<string>;
  readonly sessionId: HttpData<string>;
  readonly user: HttpData<User>;
  readonly currentUser: User;
  readonly appAdditionToAccount: HttpData<void>;
  readonly appRemovalFromAccount: HttpData<void>;
}
