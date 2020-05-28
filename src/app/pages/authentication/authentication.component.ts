import {Component, OnInit} from '@angular/core';

import {Observable} from 'rxjs';

import {AppStoreFacadeService} from '../../core/services/app-store-facade/app-store-facade.service';
import {ConfigStoreFacadeService} from '../../core/services/config-store-facade/config-store-facade.service';
import {LayoutStoreFacadeService} from '../../core/services/layout-store-facade/layout-store-facade.service';
import {NewsStoreFacadeService} from '../../core/services/news-store-facade/news-store-facade.service';
import {UserStoreFacadeService} from '../../core/services/user-store-facade/user-store-facade.service';
import {PlainCredentials} from '../../model/plain-credentials.model';
import {Registration} from '../../model/registration.model';

@Component({
  selector: 'ds-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  isLoginOrRegistrationShown: Observable<boolean>;
  isLoginLoading: Observable<boolean>;
  isRegistrationLoading: Observable<boolean>;
  loginErrorMessage: Observable<string>;
  registrationErrorMessage: Observable<string>;
  login: Observable<string>;

  constructor(private layoutStoreFacadeService: LayoutStoreFacadeService,
              private userStoreFacadeService: UserStoreFacadeService,
              private configStoreFacadeService: ConfigStoreFacadeService,
              private appStoreFacadeService: AppStoreFacadeService,
              private newsStoreFacadeService: NewsStoreFacadeService) {
  }

  ngOnInit(): void {
    this.isLoginOrRegistrationShown = this.layoutStoreFacadeService.isLoginOrRegistrationShown();
    this.isLoginLoading = this.userStoreFacadeService.isLoginLoading();
    this.isRegistrationLoading = this.userStoreFacadeService.isRegistrationLoading();
    this.loginErrorMessage = this.userStoreFacadeService.getLoginErrorMessage();
    this.registrationErrorMessage = this.userStoreFacadeService.getRegistrationErrorMessage();

    document.body.style.backgroundImage = 'url(\'assets/images/background.png\')';

    this.configStoreFacadeService.loadClientConfigs();
    this.appStoreFacadeService.loadApps();
    this.newsStoreFacadeService.loadLatestNews();
  }

  openLogin(): void {
    this.layoutStoreFacadeService.openLogin();
  }

  openRegistration(): void {
    this.layoutStoreFacadeService.openRegistration();
  }

  startLoginProcess(plainCredentials: PlainCredentials) {
    this.userStoreFacadeService.startLoginProcess(plainCredentials);
  }

  register(registration: Registration) {
    this.userStoreFacadeService.register(registration);
  }
}
