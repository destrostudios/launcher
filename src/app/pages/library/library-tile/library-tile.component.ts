import { Component, Input } from '@angular/core';

import { App } from '../../../interfaces/app.interface';

@Component({
  selector: 'ds-library-tile',
  templateUrl: './library-tile.component.html',
  styleUrls: ['./library-tile.component.scss'],
})
export class LibraryTileComponent {
  @Input() app: App;
}
