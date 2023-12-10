import { Component, Input } from '@angular/core';

import { App } from '../../../interfaces/app.interface';

@Component({
  selector: 'ds-app-hub',
  templateUrl: './app-hub.component.html',
  styleUrls: ['./app-hub.component.scss'],
})
export class AppHubComponent {
  @Input() app: App;
}
