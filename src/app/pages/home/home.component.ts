import {Component, OnInit} from '@angular/core';

import {Observable} from 'rxjs';

import {LayoutStoreFacadeService} from '../../core/services/layout-store-facade/layout-store-facade.service';
import {NewsStoreFacadeService} from '../../core/services/news-store-facade/news-store-facade.service';
import {News} from '../../model/news.model';

@Component({
  selector: 'ds-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  LANGUAGES = ['de', 'en'];

  latestNews: Observable<News[]>;
  language: Observable<string>;

  constructor(private newsStoreFacadeService: NewsStoreFacadeService,
              private layoutStoreFacadeService: LayoutStoreFacadeService) {
  }

  ngOnInit(): void {
    this.latestNews = this.newsStoreFacadeService.getLatestNews();
    this.language = this.layoutStoreFacadeService.getLanguage();

    document.body.style.backgroundImage = 'url(\'assets/images/background.png\')';
  }

  setLanguage(language: string): void {
    this.layoutStoreFacadeService.setLanguage(language);
  }
}
