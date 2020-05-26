import {Component, OnInit} from '@angular/core';

import {Observable} from 'rxjs';

import {LayoutStoreFacadeService} from '../../core/services/layout-store-facade/layout-store-facade.service';
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
              private userStoreFacadeService: UserStoreFacadeService) {
  }

  ngOnInit(): void {
    this.isLoginOrRegistrationShown = this.layoutStoreFacadeService.isLoginOrRegistrationShown();
    this.isLoginLoading = this.userStoreFacadeService.isLoginLoading();
    this.isRegistrationLoading = this.userStoreFacadeService.isRegistrationLoading();
    this.loginErrorMessage = this.userStoreFacadeService.getLoginErrorMessage();
    this.registrationErrorMessage = this.userStoreFacadeService.getRegistrationErrorMessage();

    document.body.style.backgroundImage = 'url(\'assets/images/background.png\')';
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
