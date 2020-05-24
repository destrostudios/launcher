import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'ds-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() closeable = true;
  @Output() closeModal = new EventEmitter<void>();
}
