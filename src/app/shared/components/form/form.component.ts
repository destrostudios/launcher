import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

import {
  FormInput,
  FormLink,
  FormValues,
} from '../../../interfaces/form.interface';

@Component({
  selector: 'ds-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() formTitle: string;
  @Input() description: string;
  @Input() inputs: FormInput[];
  @Input() links: FormLink[];
  @Input() submitTitle: string;
  @Input() isLoading: boolean;
  @Input() errorMessage: string;
  @Output() submitForm = new EventEmitter<FormValues>();

  loginForm: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      this.inputs.reduce(
        (config, input) => ({
          ...config,
          [input.name]: input.config,
        }),
        {},
      ),
    );
  }

  submit(): void {
    if (this.loginForm.valid) {
      this.submitForm.emit(this.loginForm.getRawValue());
    }
  }
}
