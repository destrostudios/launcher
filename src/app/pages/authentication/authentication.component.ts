import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { BackgroundService } from '../../core/services/background.service';
import { PlainCredentials } from '../../model/plain-credentials.model';
import { Registration } from '../../model/registration.model';
import * as AppActions from '../../store/actions/app.actions';
import * as ConfigActions from '../../store/actions/config.actions';
import * as LayoutActions from '../../store/actions/layout.actions';
import * as NewsActions from '../../store/actions/news.actions';
import * as UserActions from '../../store/actions/user.actions';
import { isLoginLoading } from '../../store/selectors/aggregation.selectors';
import { isLoginOrRegistrationShown } from '../../store/selectors/layout.selectors';
import {
  getLoginErrorMessage,
  getRegistrationErrorMessage,
  isRegistrationLoading,
} from '../../store/selectors/user.selectors';

@Component({
  selector: 'ds-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
  isLoginOrRegistrationShown: Observable<boolean>;
  isLoginLoading: Observable<boolean>;
  isRegistrationLoading: Observable<boolean>;
  loginErrorMessage: Observable<string>;
  registrationErrorMessage: Observable<string>;
  login: Observable<string>;

  constructor(
    private store: Store,
    private backgroundService: BackgroundService,
  ) {}

  ngOnInit(): void {
    this.isLoginOrRegistrationShown = this.store.select(
      isLoginOrRegistrationShown,
    );
    this.isLoginLoading = this.store.select(isLoginLoading);
    this.isRegistrationLoading = this.store.select(isRegistrationLoading);
    this.loginErrorMessage = this.store.select(getLoginErrorMessage);
    this.registrationErrorMessage = this.store.select(
      getRegistrationErrorMessage,
    );

    this.backgroundService.reset();

    this.store.dispatch(ConfigActions.loadClientConfigs());
    this.store.dispatch(AppActions.loadApps());
    this.store.dispatch(NewsActions.loadLatestNews());
  }

  openLogin(): void {
    this.store.dispatch(LayoutActions.openLogin());
  }

  openRegistration(): void {
    this.store.dispatch(LayoutActions.openRegistration());
  }

  startLoginProcess(plainCredentials: PlainCredentials) {
    this.store.dispatch(UserActions.startLoginProcess({ plainCredentials }));
  }

  register(registration: Registration) {
    this.store.dispatch(UserActions.register({ registration }));
  }
}
