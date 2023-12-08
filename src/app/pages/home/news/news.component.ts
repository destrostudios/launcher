import { Component, Input } from '@angular/core';

import { News } from '../../../model/news.model';

@Component({
  selector: 'ds-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent {
  @Input() news: News;
}
