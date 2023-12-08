import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'ds-spinner-button',
  templateUrl: './spinner-button.component.html',
  styleUrls: ['./spinner-button.component.scss'],
})
export class SpinnerButtonComponent {
  @Input() formGroup: UntypedFormGroup;
  @Input() text: string;
  @Output() action = new EventEmitter<void>();
  @Input() isLoading: boolean;
}
