import {Component} from '@angular/core';

import {Observable} from 'rxjs';

import {LayoutStoreFacadeService} from '../../core/services/layout-store-facade/layout-store-facade.service';
import {News} from '../../model/news.model';

@Component({
  selector: 'ds-offline',
  templateUrl: './offline.component.html',
  styleUrls: ['./offline.component.scss']
})
export class OfflineComponent {

  latestNews: Observable<News[]>;

  constructor(private layoutStoreFacadeService: LayoutStoreFacadeService) {
  }

  retry(): void {
    this.layoutStoreFacadeService.navigate('');
  }
}
