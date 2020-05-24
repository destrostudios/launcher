import {Component, Input} from '@angular/core';

import {App} from '../../../model/app.model';

@Component({
  selector: 'ds-library-tile',
  templateUrl: './library-tile.component.html',
  styleUrls: ['./library-tile.component.scss']
})
export class LibraryTileComponent {
  @Input() app: App;
}
