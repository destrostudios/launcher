import {Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'ds-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent {
  @HostBinding('class.type')
  @Input() type: 'small' | 'large' = 'small';
}
