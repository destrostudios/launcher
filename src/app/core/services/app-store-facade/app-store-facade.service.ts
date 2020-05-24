import {Injectable} from '@angular/core';

import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {App} from '../../../model/app.model';
import * as AppActions from '../../../store/actions/app.actions';
import {getFeaturedApp, isSelectedAppOwned_Store} from '../../../store/selectors/aggregation.selectors';
import {
  getApps,
  getLibrarySearchText,
  getSelectedApp_Library,
  getSelectedApp_Store
} from '../../../store/selectors/app.selectors';
import {AppState} from '../../../store/state/app-state.model';

@Injectable()
export class AppStoreFacadeService {

  constructor(private store: Store<AppState>) {
  }

  getFeaturedApp(): Observable<App> {
    return this.store.select(getFeaturedApp);
  }

  getApps(): Observable<App[]> {
    return this.store.select(getApps);
  }

  getSelectedApp_Store(): Observable<App> {
    return this.store.select(getSelectedApp_Store);
  }

  getSelectedApp_Library(): Observable<App> {
    return this.store.select(getSelectedApp_Library);
  }

  isSelectedAppOwned_Store(): Observable<boolean> {
    return this.store.select(isSelectedAppOwned_Store);
  }

  getLibrarySearchText(): Observable<string> {
    return this.store.select(getLibrarySearchText);
  }

  loadApps(): void {
    this.store.dispatch(AppActions.loadApps());
  }

  selectApp_Store(appId: number): void {
    this.store.dispatch(AppActions.selectApp_Store({ appId }));
  }

  deselectApp_Store(): void {
    this.store.dispatch(AppActions.deselectApp_Store());
  }

  selectApp_Library(appId: number): void {
    this.store.dispatch(AppActions.selectApp_Library({ appId }));
  }

  setLibrarySearchText(text: string): void {
    this.store.dispatch(AppActions.setLibrarySearchText({ text }));
  }
}
