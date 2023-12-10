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
  getConfirmEmailErrorMessage,
  isConfirmEmailLoading,
  isSendEmailConfirmationEmailLoading,
} from '../../../store/selectors/user.selectors';

@Component({
  selector: 'ds-confirm-email',
  templateUrl: './confirm-email.component.html',
})
export class ConfirmEmailComponent implements OnInit, OnDestroy {
  inputs: FormInput[];
  links: FormLink[];
  isConfirmationLoading: Observable<boolean>;
  isSendingEmailLoading: Observable<boolean>;
  errorMessage: Observable<string>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.inputs = [
      {
        name: 'emailSecret',
        title: 'CODE',
        type: 'text',
        config: ['', Validators.required],
      },
    ];
    this.links = [
      {
        title: 'SEND_EMAIL_AGAIN',
        action: () => this.sendEmailConfirmationEmail(),
      },
      { title: 'BACK', action: () => this.navigateToLogin() },
    ];
    this.isConfirmationLoading = this.store.select(isConfirmEmailLoading);
    this.isSendingEmailLoading = this.store.select(
      isSendEmailConfirmationEmailLoading,
    );
    this.errorMessage = this.store.select(getConfirmEmailErrorMessage);
  }

  sendEmailConfirmationEmail(): void {
    this.store.dispatch(UserActions.sendEmailConfirmationEmail());
  }

  navigateToLogin(): void {
    this.store.dispatch(
      LayoutActions.navigate({ route: 'authentication/login' }),
    );
  }

  confirmEmail({ emailSecret }: FormValues): void {
    this.store.dispatch(UserActions.confirmEmail({ emailSecret }));
  }

  ngOnDestroy(): void {
    this.store.dispatch(UserActions.clearConfirmEmail());
  }
}
