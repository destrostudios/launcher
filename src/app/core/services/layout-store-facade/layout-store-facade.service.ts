import {Injectable} from '@angular/core';

import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import * as LayoutActions from '../../../store/actions/layout.actions';
import {
  getLanguage,
  isAppAdditionToAccountErrorShown,
  isAppRemovalFromAccountErrorShown,
  isHeaderShown,
  isLoginOrRegistrationShown
} from '../../../store/selectors/layout.selectors';
import {LayoutState} from '../../../store/state/layout-state.model';

@Injectable()
export class LayoutStoreFacadeService {

  constructor(private store: Store<LayoutState>) {
  }

  getLanguage(): Observable<string> {
    return this.store.select(getLanguage);
  }

  isHeaderShown(): Observable<boolean> {
    return this.store.select(isHeaderShown);
  }

  isLoginOrRegistrationShown(): Observable<boolean> {
    return this.store.select(isLoginOrRegistrationShown);
  }

  isAppAdditionToAccountErrorShown(): Observable<boolean> {
    return this.store.select(isAppAdditionToAccountErrorShown);
  }

  isAppRemovalFromAccountErrorShown(): Observable<boolean> {
    return this.store.select(isAppRemovalFromAccountErrorShown);
  }

  setLanguage(language: string): void {
    this.store.dispatch(LayoutActions.setLanguage({ language }));
  }

  navigate(route: string): void {
    this.store.dispatch(LayoutActions.navigate({ route }));
  }

  openLogin(): void {
    this.store.dispatch(LayoutActions.openLogin());
  }

  openRegistration(): void {
    this.store.dispatch(LayoutActions.openRegistration());
  }

  hideAppAdditionToAccountError(): void {
    this.store.dispatch(LayoutActions.hideAppAdditionToAccountError());
  }

  hideAppRemovalFromAccountError(): void {
    this.store.dispatch(LayoutActions.hideAppRemovalFromAccountError());
  }
}
