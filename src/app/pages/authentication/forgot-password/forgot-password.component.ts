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
  getSendPasswordResetEmailErrorMessage,
  isSendPasswordResetEmailLoading,
} from '../../../store/selectors/user.selectors';

@Component({
  selector: 'ds-forgot-password',
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
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
    ];
    this.links = [{ title: 'BACK', action: () => this.navigateToLogin() }];
    this.isLoading = this.store.select(isSendPasswordResetEmailLoading);
    this.errorMessage = this.store.select(
      getSendPasswordResetEmailErrorMessage,
    );
  }

  navigateToLogin(): void {
    this.store.dispatch(
      LayoutActions.navigate({ route: 'authentication/login' }),
    );
  }

  sendPasswordResetEmail({ login }: FormValues): void {
    this.store.dispatch(UserActions.sendPasswordResetEmail({ login }));
  }

  ngOnDestroy(): void {
    this.store.dispatch(UserActions.clearSendPasswordResetEmail());
  }
}
