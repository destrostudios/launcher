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
  getRegistrationErrorMessage,
  isRegistrationLoading,
} from '../../../store/selectors/user.selectors';

@Component({
  selector: 'ds-registration',
  templateUrl: './registration.component.html',
})
export class RegistrationComponent implements OnInit, OnDestroy {
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
        name: 'email',
        title: 'EMAIL',
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
    this.links = [{ title: 'BACK', action: () => this.navigateToLogin() }];
    this.isLoading = this.store.select(isRegistrationLoading);
    this.errorMessage = this.store.select(getRegistrationErrorMessage);
  }

  navigateToLogin(): void {
    this.store.dispatch(
      LayoutActions.navigate({ route: 'authentication/login' }),
    );
  }

  register({ login, email, password }: FormValues): void {
    this.store.dispatch(UserActions.register({ login, email, password }));
  }

  ngOnDestroy(): void {
    this.store.dispatch(UserActions.clearRegistration());
  }
}
