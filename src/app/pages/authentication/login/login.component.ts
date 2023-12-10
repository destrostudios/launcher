import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  FormInput,
  FormLink,
  FormValues,
} from '../../../interfaces/form.interface';
import * as LayoutActions from '../../../store/actions/layout.actions';
import * as UserActions from '../../../store/actions/user.actions';
import { isLoginLoading } from '../../../store/selectors/aggregation.selectors';
import { getLoginErrorMessage } from '../../../store/selectors/user.selectors';

@Component({
  selector: 'ds-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
  inputs: FormInput[];
  links: FormLink[];
  isLoading: Observable<boolean>;
  errorMessage: Observable<string>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.inputs = [
      {
        name: 'login',
        title: 'LOGIN',
        type: 'text',
        config: ['', Validators.required],
      },
      {
        name: 'password',
        title: 'PASSWORD',
        type: 'password',
        config: ['', Validators.required],
      },
    ];
    this.links = [
      { title: 'REGISTER', action: () => this.navigateToRegistration() },
      {
        title: 'FORGOT_PASSWORD',
        action: () => this.navigateToForgotPassword(),
      },
    ];
    this.isLoading = this.store.select(isLoginLoading);
    this.errorMessage = this.store.select(getLoginErrorMessage);
  }

  navigateToRegistration(): void {
    this.store.dispatch(
      LayoutActions.navigate({ route: 'authentication/registration' }),
    );
  }

  navigateToForgotPassword(): void {
    this.store.dispatch(
      LayoutActions.navigate({ route: 'authentication/forgotPassword' }),
    );
  }

  login({ login, password }: FormValues): void {
    this.store.dispatch(UserActions.startLoginProcess({ login, password }));
  }

  ngOnDestroy(): void {
    this.store.dispatch(UserActions.clearLogin());
  }
}
