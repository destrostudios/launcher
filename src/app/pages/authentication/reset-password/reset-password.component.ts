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
import {
  getAuthenticationLogin,
  getResetPasswordErrorMessage,
  isResetPasswordLoading,
} from '../../../store/selectors/user.selectors';

@Component({
  selector: 'ds-reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  inputs: FormInput[];
  links: FormLink[];
  login: Observable<string>;
  isLoading: Observable<boolean>;
  errorMessage: Observable<string>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.inputs = [
      {
        name: 'password',
        title: 'PASSWORD',
        type: 'password',
        config: ['', Validators.required],
      },
      {
        name: 'emailSecret',
        title: 'CODE',
        type: 'text',
        config: ['', Validators.required],
      },
    ];
    this.links = [{ title: 'BACK', action: () => this.navigateToLogin() }];
    this.login = this.store.select(getAuthenticationLogin);
    this.isLoading = this.store.select(isResetPasswordLoading);
    this.errorMessage = this.store.select(getResetPasswordErrorMessage);
  }

  navigateToLogin(): void {
    this.store.dispatch(
      LayoutActions.navigate({ route: 'authentication/login' }),
    );
  }

  resetPassword({ password, emailSecret }: FormValues): void {
    this.store.dispatch(
      UserActions.startResetPasswordProcess({ password, emailSecret }),
    );
  }

  ngOnDestroy(): void {
    this.store.dispatch(UserActions.clearResetPassword());
  }
}
