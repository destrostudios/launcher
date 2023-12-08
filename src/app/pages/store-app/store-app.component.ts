import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { BackgroundService } from '../../core/services/background.service';
import { App } from '../../model/app.model';
import * as AppActions from '../../store/actions/app.actions';
import * as LayoutActions from '../../store/actions/layout.actions';
import * as UserActions from '../../store/actions/user.actions';
import { isSelectedAppOwned_Store } from '../../store/selectors/aggregation.selectors';
import { getSelectedApp_Store } from '../../store/selectors/app.selectors';
import {
  isAppAdditionToAccountErrorShown,
  isAppRemovalFromAccountErrorShown,
} from '../../store/selectors/layout.selectors';
import {
  isAppAdditionToAccountIncludingUpdateLoading,
  isAppRemovalFromAccountIncludingUpdateLoading,
} from '../../store/selectors/user.selectors';

@Component({
  selector: 'ds-store-app',
  templateUrl: './store-app.component.html',
  styleUrls: ['./store-app.component.scss'],
})
export class StoreAppComponent implements OnInit, OnDestroy {
  app: Observable<App>;
  isSelectedAppOwned_Store: Observable<boolean>;
  isAppAdditionToAccountLoading: Observable<boolean>;
  isAppRemovalFromAccountLoading: Observable<boolean>;
  isAppAdditionToAccountErrorShown: Observable<boolean>;
  isAppRemovalFromAccountErrorShown: Observable<boolean>;

  private backgroundImageSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private backgroundService: BackgroundService,
  ) {}

  ngOnInit(): void {
    this.app = this.store.select(getSelectedApp_Store);
    this.isSelectedAppOwned_Store = this.store.select(isSelectedAppOwned_Store);
    this.isAppAdditionToAccountLoading = this.store.select(
      isAppAdditionToAccountIncludingUpdateLoading,
    );
    this.isAppRemovalFromAccountLoading = this.store.select(
      isAppRemovalFromAccountIncludingUpdateLoading,
    );
    this.isAppAdditionToAccountErrorShown = this.store.select(
      isAppAdditionToAccountErrorShown,
    );
    this.isAppRemovalFromAccountErrorShown = this.store.select(
      isAppRemovalFromAccountErrorShown,
    );

    this.backgroundImageSubscription = this.app.subscribe((selectedApp) => {
      this.backgroundService.setApp(selectedApp);
    });

    this.activatedRoute.params.subscribe((params) => {
      const appId = Number(params.appId);
      if (appId) {
        this.store.dispatch(AppActions.selectApp_Store({ appId }));
      }
    });
  }

  ngOnDestroy(): void {
    this.backgroundImageSubscription.unsubscribe();
  }

  deselectApp(): void {
    this.store.dispatch(AppActions.deselectApp_Store());
  }

  addAppToAccount(appId: number): void {
    this.store.dispatch(UserActions.addAppToAccount({ appId }));
  }

  removeAppFromAccount(appId: number): void {
    this.store.dispatch(UserActions.removeAppFromAccount({ appId }));
  }

  hideAppAdditionToAccountError(): void {
    this.store.dispatch(LayoutActions.hideAppAdditionToAccountError());
  }

  hideAppRemovalFromAccountError(): void {
    this.store.dispatch(LayoutActions.hideAppRemovalFromAccountError());
  }
}
