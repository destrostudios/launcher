import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import * as LayoutActions from './store/actions/layout.actions';
import { isHeaderShown } from './store/selectors/layout.selectors';

@Component({
  selector: 'ds-app',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  isHeaderShown: Observable<boolean>;

  constructor(
    private translateService: TranslateService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');

    this.isHeaderShown = this.store.select(isHeaderShown);

    this.store.dispatch(LayoutActions.navigate({ route: 'update' }));
  }
}
