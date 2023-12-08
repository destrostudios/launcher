import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

import { PlainCredentials } from '../../../model/plain-credentials.model';

@Component({
  selector: 'ds-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @Input() isLoading: boolean;
  @Input() errorMessage: string;
  @Output() login = new EventEmitter<PlainCredentials>();
  @Output() register = new EventEmitter<void>();

  loginForm: UntypedFormGroup;

  constructor(formBuilder: UntypedFormBuilder) {
    this.loginForm = formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const login = this.loginForm.controls.login.value;
      const password = this.loginForm.controls.password.value;
      this.login.emit({ login, password });
    }
  }
}
