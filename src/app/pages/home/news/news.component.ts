import { Component, Input } from '@angular/core';

import { News } from '../../../interfaces/news.interface';

@Component({
  selector: 'ds-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent {
  @Input() news: News;
}
