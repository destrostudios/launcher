import {Injectable} from '@angular/core';

import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {App} from '../../../model/app.model';
import {PlainCredentials} from '../../../model/plain-credentials.model';
import {Registration} from '../../../model/registration.model';
import * as UserActions from '../../../store/actions/user.actions';
import {getDisplayedLibraryApps, hasOwnedApps, isLoginLoading} from '../../../store/selectors/aggregation.selectors';
import {
  getLogin,
  getSessionId,
  isAppAdditionToAccountIncludingUpdateLoading,
  isAppRemovalFromAccountIncludingUpdateLoading,
  isRegistrationLoading,
  getLoginErrorMessage,
  getRegistrationErrorMessage
} from '../../../store/selectors/user.selectors';
import {UserState} from '../../../store/state/user-state.model';

@Injectable()
export class UserStoreFacadeService {

  constructor(private store: Store<UserState>) {
  }

  isRegistrationLoading(): Observable<boolean> {
    return this.store.select(isRegistrationLoading);
  }

  getRegistrationErrorMessage(): Observable<string> {
    return this.store.select(getRegistrationErrorMessage);
  }

  isLoginLoading(): Observable<boolean> {
    return this.store.select(isLoginLoading);
  }

  getLoginErrorMessage(): Observable<string> {
    return this.store.select(getLoginErrorMessage);
  }

  getSessionId(): Observable<string> {
    return this.store.select(getSessionId);
  }

  getLogin(): Observable<string> {
    return this.store.select(getLogin);
  }

  hasOwnedApps(): Observable<boolean> {
    return this.store.select(hasOwnedApps);
  }

  getDisplayedLibraryApps(): Observable<App[]> {
    return this.store.select(getDisplayedLibraryApps);
  }

  isAppAdditionToAccountIncludingUpdateLoading(): Observable<boolean> {
    return this.store.select(isAppAdditionToAccountIncludingUpdateLoading);
  }

  isAppRemovalFromAccountIncludingUpdateLoading(): Observable<boolean> {
    return this.store.select(isAppRemovalFromAccountIncludingUpdateLoading);
  }

  startLoginProcess(plainCredentials: PlainCredentials): void {
    this.store.dispatch(UserActions.startLoginProcess({ plainCredentials }));
  }

  register(registration: Registration): void {
    this.store.dispatch(UserActions.register({ registration }));
  }

  logout(): void {
    this.store.dispatch(UserActions.logout());
  }

  addAppToAccount(appId: number): void {
    this.store.dispatch(UserActions.addAppToAccount({ appId }));
  }

  removeAppFromAccount(appId: number): void {
    this.store.dispatch(UserActions.removeAppFromAccount({ appId }));
  }
}
