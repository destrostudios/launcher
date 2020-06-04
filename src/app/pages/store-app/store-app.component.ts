import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Observable, Subscription} from 'rxjs';

import {AppStoreFacadeService} from '../../core/services/app-store-facade/app-store-facade.service';
import {BackgroundService} from '../../core/services/background/background.service';
import {LayoutStoreFacadeService} from '../../core/services/layout-store-facade/layout-store-facade.service';
import {UserStoreFacadeService} from '../../core/services/user-store-facade/user-store-facade.service';
import {App} from '../../model/app.model';

@Component({
  selector: 'ds-store-app',
  templateUrl: './store-app.component.html',
  styleUrls: ['./store-app.component.scss']
})
export class StoreAppComponent implements OnInit, OnDestroy {

  app: Observable<App>;
  isSelectedAppOwned_Store: Observable<boolean>;
  isAppAdditionToAccountLoading: Observable<boolean>;
  isAppRemovalFromAccountLoading: Observable<boolean>;
  isAppAdditionToAccountErrorShown: Observable<boolean>;
  isAppRemovalFromAccountErrorShown: Observable<boolean>;

  private backgroundImageSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
              private appStoreFacadeService: AppStoreFacadeService,
              private userStoreFacadeService: UserStoreFacadeService,
              private layoutStoreFacadeService: LayoutStoreFacadeService,
              private backgroundService: BackgroundService) {
  }

  ngOnInit(): void {
    this.app = this.appStoreFacadeService.getSelectedApp_Store();
    this.isSelectedAppOwned_Store = this.appStoreFacadeService.isSelectedAppOwned_Store();
    this.isAppAdditionToAccountLoading = this.userStoreFacadeService.isAppAdditionToAccountIncludingUpdateLoading();
    this.isAppRemovalFromAccountLoading = this.userStoreFacadeService.isAppRemovalFromAccountIncludingUpdateLoading();
    this.isAppAdditionToAccountErrorShown = this.layoutStoreFacadeService.isAppAdditionToAccountErrorShown();
    this.isAppRemovalFromAccountErrorShown = this.layoutStoreFacadeService.isAppRemovalFromAccountErrorShown();

    this.backgroundImageSubscription = this.app.subscribe(selectedApp => {
      this.backgroundService.setApp(selectedApp);
    });

    this.activatedRoute.params.subscribe(params => {
      const selectedAppId = Number(params.appId);
      if (selectedAppId) {
        this.appStoreFacadeService.selectApp_Store(selectedAppId);
      }
    });
  }

  ngOnDestroy(): void {
    this.backgroundImageSubscription.unsubscribe();
  }

  deselectApp(): void {
    this.appStoreFacadeService.deselectApp_Store();
  }

  addAppToAccount(app: App): void {
    this.userStoreFacadeService.addAppToAccount(app.id);
  }

  removeAppFromAccount(app: App): void {
    this.userStoreFacadeService.removeAppFromAccount(app.id);
  }

  hideAppAdditionToAccountError(): void {
    this.layoutStoreFacadeService.hideAppAdditionToAccountError();
  }

  hideAppRemovalFromAccountError(): void {
    this.layoutStoreFacadeService.hideAppRemovalFromAccountError();
  }
}
