import { Component, Input } from '@angular/core';

import { App } from '../../../interfaces/app.interface';

@Component({
  selector: 'ds-store-tile',
  templateUrl: './store-tile.component.html',
  styleUrls: ['./store-tile.component.scss'],
})
export class StoreTileComponent {
  @Input() app: App;
}
