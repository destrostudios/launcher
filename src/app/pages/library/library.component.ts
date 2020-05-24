import {Component, OnDestroy, OnInit} from '@angular/core';

import {Observable, Subscription} from 'rxjs';

import {AppStoreFacadeService} from '../../core/services/app-store-facade/app-store-facade.service';
import {UserStoreFacadeService} from '../../core/services/user-store-facade/user-store-facade.service';
import {App} from '../../model/app.model';

@Component({
  selector: 'ds-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit, OnDestroy {

  hasOwnedApps: Observable<boolean>;
  displayedApps: Observable<App[]>;
  selectedApp: Observable<App>;
  librarySearchText: Observable<string>;

  private subscriptions: Subscription[];

  constructor(private appStoreFacadeService: AppStoreFacadeService,
              private userStoreFacadeService: UserStoreFacadeService) {
  }

  ngOnInit(): void {
    this.hasOwnedApps = this.userStoreFacadeService.hasOwnedApps();
    this.displayedApps = this.userStoreFacadeService.getDisplayedLibraryApps();
    this.selectedApp = this.appStoreFacadeService.getSelectedApp_Library();
    this.librarySearchText = this.appStoreFacadeService.getLibrarySearchText();

    this.subscriptions = [
      this.selectedApp.subscribe(selectedApp => {
        document.body.style.backgroundImage = 'url(\'assets/images/background' + (selectedApp ? '_' + selectedApp.id : '') + '.png\')';
      }),
    ];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  selectApp(app: App): void {
    this.appStoreFacadeService.selectApp_Library(app.id);
  }

  setLibrarySearchText(event: Event): void {
    const text = (event.target as HTMLInputElement).value;
    this.appStoreFacadeService.setLibrarySearchText(text);
  }
}
