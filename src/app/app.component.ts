import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { LayoutStoreFacadeService } from './core/services/layout-store-facade/layout-store-facade.service';

@Component({
  selector: 'ds-app',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  isHeaderShown: Observable<boolean>;

  constructor(
    private translateService: TranslateService,
    private layoutStoreFacadeService: LayoutStoreFacadeService,
  ) {}

  ngOnInit(): void {
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');

    this.isHeaderShown = this.layoutStoreFacadeService.isHeaderShown();

    this.layoutStoreFacadeService.navigate('update');
  }
}
