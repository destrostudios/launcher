import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { BackgroundService } from '../../core/services/background.service';
import * as AppActions from '../../store/actions/app.actions';
import * as ConfigActions from '../../store/actions/config.actions';
import * as NewsActions from '../../store/actions/news.actions';

@Component({
  selector: 'ds-authentication',
  templateUrl: './authentication.component.html',
})
export class AuthenticationComponent implements OnInit {
  constructor(
    private store: Store,
    private backgroundService: BackgroundService,
  ) {}

  ngOnInit(): void {
    this.backgroundService.reset();

    this.store.dispatch(ConfigActions.loadClientConfigs());
    this.store.dispatch(AppActions.loadApps());
    this.store.dispatch(NewsActions.loadLatestNews());
  }
}
