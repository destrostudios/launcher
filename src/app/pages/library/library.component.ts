import {Component, OnDestroy, OnInit} from '@angular/core';

import {Observable, Subscription} from 'rxjs';

import {AppStoreFacadeService} from '../../core/services/app-store-facade/app-store-facade.service';
import {UserStoreFacadeService} from '../../core/services/user-store-facade/user-store-facade.service';
import {App} from '../../model/app.model';
import {LocalAppVersion} from '../../model/local-app-version.enum';

@Component({
  selector: 'ds-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit, OnDestroy {

  LocalAppVersion = LocalAppVersion;

  hasOwnedApps: Observable<boolean>;
  librarySearchText: Observable<string>;
  displayedApps: Observable<App[]>;
  selectedApp: Observable<App>;
  selectedApp_LocalVersion: Observable<LocalAppVersion>;
  selectedApp_UpdateProgressText: Observable<string>;
  isSomeLocalAppUpdating: Observable<boolean>;

  private subscriptions: Subscription[];

  constructor(private appStoreFacadeService: AppStoreFacadeService,
              private userStoreFacadeService: UserStoreFacadeService) {
  }

  ngOnInit(): void {
    this.hasOwnedApps = this.userStoreFacadeService.hasOwnedApps();
    this.librarySearchText = this.appStoreFacadeService.getLibrarySearchText();
    this.displayedApps = this.userStoreFacadeService.getDisplayedLibraryApps();
    this.selectedApp = this.appStoreFacadeService.getSelectedApp_Library();
    this.selectedApp_LocalVersion = this.appStoreFacadeService.getSelectedApp_Library_LocalVersion();
    this.selectedApp_UpdateProgressText = this.appStoreFacadeService.getSelectedApp_Library_UpdateProgressText();
    this.isSomeLocalAppUpdating = this.appStoreFacadeService.isSomeLocalAppUpdating();

    this.subscriptions = [
      this.selectedApp.subscribe(selectedApp => {
        document.body.style.backgroundImage = 'url(\'assets/images/background' + (selectedApp ? '_' + selectedApp.id : '') + '.png\')';
      }),
    ];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getUpdateButtonText(localAppVersion: LocalAppVersion): string {
    switch (localAppVersion) {
      case LocalAppVersion.CHECKING_UPDATE: return 'CHECKING_UPDATE';
      case LocalAppVersion.OUTDATED: return 'UPDATE';
      case LocalAppVersion.UPDATING: return 'UPDATING';
    }
    return null;
  }

  selectApp(app: App): void {
    this.appStoreFacadeService.selectApp_Library(app.id);
  }

  setLibrarySearchText(event: Event): void {
    const text = (event.target as HTMLInputElement).value;
    this.appStoreFacadeService.setLibrarySearchText(text);
  }

  startApp(appId: number): void {
    this.appStoreFacadeService.startApp(appId);
  }

  updateApp(appId: number): void {
    this.appStoreFacadeService.updateApp(appId);
  }
}
