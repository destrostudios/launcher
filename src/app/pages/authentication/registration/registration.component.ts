import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import * as bcrypt from 'bcryptjs';

import {Registration} from '../../../model/registration.model';

@Component({
  selector: 'ds-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  @Input() isLoading: boolean;
  @Input() errorMessage: string;
  @Output() login = new EventEmitter<void>();
  @Output() register = new EventEmitter<Registration>();

  registrationForm: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.registrationForm = formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const login = this.registrationForm.controls.login.value;
      const password = this.registrationForm.controls.password.value;
      const saltClient = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, saltClient);
      this.register.emit({ login, saltClient, hashedPassword });
    }
  }
}
