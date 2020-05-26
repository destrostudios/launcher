import {Component, OnInit} from '@angular/core';

import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';

import {AppStoreFacadeService} from './core/services/app-store-facade/app-store-facade.service';
import {ConfigStoreFacadeService} from './core/services/config-store-facade/config-store-facade.service';
import {LayoutStoreFacadeService} from './core/services/layout-store-facade/layout-store-facade.service';
import {NewsStoreFacadeService} from './core/services/news-store-facade/news-store-facade.service';

@Component({
  selector: 'ds-app',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  isHeaderShown: Observable<boolean>;

  constructor(private translateService: TranslateService,
              private layoutStoreFacadeService: LayoutStoreFacadeService,
              private configStoreFacadeService: ConfigStoreFacadeService,
              private appStoreFacadeService: AppStoreFacadeService,
              private newsStoreFacadeService: NewsStoreFacadeService) {
  }

  ngOnInit(): void {
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');

    this.isHeaderShown = this.layoutStoreFacadeService.isHeaderShown();

    this.layoutStoreFacadeService.navigate('update');
    this.configStoreFacadeService.loadClientConfigs();
    this.appStoreFacadeService.loadApps();
    this.newsStoreFacadeService.loadLatestNews();
  }
}
