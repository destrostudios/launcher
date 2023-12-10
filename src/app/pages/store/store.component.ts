import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { BackgroundService } from '../../core/services/background.service';
import { App } from '../../interfaces/app.interface';
import { getFeaturedApp } from '../../store/selectors/aggregation.selectors';
import {
  getSelectedApp_Store,
  getStoreApps,
} from '../../store/selectors/app.selectors';

@Component({
  selector: 'ds-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit, OnDestroy {
  featuredApp: Observable<App>;
  apps: Observable<App[]>;
  selectedApp: Observable<App>;

  private subscriptions = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store,
    private backgroundService: BackgroundService,
  ) {}

  ngOnInit(): void {
    this.featuredApp = this.store.select(getFeaturedApp);
    this.apps = this.store.select(getStoreApps);
    this.selectedApp = this.store.select(getSelectedApp_Store);

    this.subscriptions = [
      this.featuredApp.subscribe((featuredApp) => {
        this.backgroundService.setApp(featuredApp);
      }),
      this.selectedApp.subscribe((selectedApp) => {
        if (selectedApp && !this.activatedRoute.snapshot.params.appId) {
          this.router.navigate(['/store/' + selectedApp.id]);
        }
      }),
    ];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
