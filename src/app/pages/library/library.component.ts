import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { BackgroundService } from '../../core/services/background.service';
import { App } from '../../interfaces/app.interface';
import { LocalAppVersion } from '../../interfaces/local-app-version.enum';
import * as AppActions from '../../store/actions/app.actions';
import {
  getDisplayedLibraryApps,
  hasOwnedApps,
} from '../../store/selectors/aggregation.selectors';
import {
  getLibrarySearchText,
  getSelectedApp_Library,
  getSelectedApp_Library_IsStarting,
  getSelectedApp_Library_LocalVersion,
  getSelectedApp_Library_UpdateProgressText,
  isSomeLocalAppUpdating,
} from '../../store/selectors/app.selectors';

@Component({
  selector: 'ds-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit, OnDestroy {
  LocalAppVersion = LocalAppVersion;

  hasOwnedApps: Observable<boolean>;
  librarySearchText: Observable<string>;
  displayedApps: Observable<App[]>;
  selectedApp: Observable<App>;
  selectedApp_LocalVersion: Observable<LocalAppVersion>;
  selectedApp_UpdateProgressText: Observable<string>;
  selectedApp_IsStarting: Observable<boolean>;
  isSomeLocalAppUpdating: Observable<boolean>;

  private subscriptions: Subscription[];

  constructor(
    private store: Store,
    private backgroundService: BackgroundService,
  ) {}

  ngOnInit(): void {
    this.hasOwnedApps = this.store.select(hasOwnedApps);
    this.librarySearchText = this.store.select(getLibrarySearchText);
    this.displayedApps = this.store.select(getDisplayedLibraryApps);
    this.selectedApp = this.store.select(getSelectedApp_Library);
    this.selectedApp_LocalVersion = this.store.select(
      getSelectedApp_Library_LocalVersion,
    );
    this.selectedApp_UpdateProgressText = this.store.select(
      getSelectedApp_Library_UpdateProgressText,
    );
    this.selectedApp_IsStarting = this.store.select(
      getSelectedApp_Library_IsStarting,
    );
    this.isSomeLocalAppUpdating = this.store.select(isSomeLocalAppUpdating);

    this.subscriptions = [
      this.selectedApp.subscribe((selectedApp) => {
        this.backgroundService.setApp(selectedApp);
      }),
    ];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getUpdateButtonText(localAppVersion: LocalAppVersion): string {
    switch (localAppVersion) {
      case LocalAppVersion.CHECKING_UPDATE:
        return 'CHECKING_UPDATE';
      case LocalAppVersion.OUTDATED:
        return 'UPDATE';
      case LocalAppVersion.UPDATING:
        return 'UPDATING';
    }
    return null;
  }

  selectApp(appId: number): void {
    this.store.dispatch(AppActions.selectApp_Library({ appId }));
  }

  setLibrarySearchText(event: Event): void {
    const text = (event.target as HTMLInputElement).value;
    this.store.dispatch(AppActions.setLibrarySearchText({ text }));
  }

  startApp(appId: number): void {
    this.store.dispatch(AppActions.startApp({ appId }));
  }

  updateApp(appId: number): void {
    this.store.dispatch(AppActions.updateApp({ appId }));
  }
}
