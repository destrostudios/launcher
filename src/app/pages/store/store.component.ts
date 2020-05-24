import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Observable} from 'rxjs';

import {AppStoreFacadeService} from '../../core/services/app-store-facade/app-store-facade.service';
import {App} from '../../model/app.model';

@Component({
  selector: 'ds-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit, OnDestroy {

  featuredApp: Observable<App>;
  apps: Observable<App[]>;
  selectedApp: Observable<App>;

  private subscriptions = [];

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private appStoreFacadeService: AppStoreFacadeService) {
  }

  ngOnInit(): void {
    this.featuredApp = this.appStoreFacadeService.getFeaturedApp();
    this.apps = this.appStoreFacadeService.getApps();
    this.selectedApp = this.appStoreFacadeService.getSelectedApp_Store();

    document.body.style.backgroundImage = 'url(\'assets/images/background_' + 1 + '.png\')';

    this.subscriptions = [
      this.featuredApp.subscribe(featuredApp => {
        document.body.style.backgroundImage = 'url(\'assets/images/background' + (featuredApp ? '_' + featuredApp.id : '') + '.png\')';
      }),
      this.selectedApp.subscribe(selectedApp => {
        if (selectedApp && (!this.activatedRoute.snapshot.params.appId)) {
          this.router.navigate(['/store/' + selectedApp.id]);
        }
      }),
    ];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
