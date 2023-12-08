import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { BackgroundService } from '../../core/services/background.service';
import { News } from '../../model/news.model';
import * as LayoutActions from '../../store/actions/layout.actions';
import { getLanguage } from '../../store/selectors/layout.selectors';
import { getLatestNews } from '../../store/selectors/news.selectors';

@Component({
  selector: 'ds-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  LANGUAGES = ['de', 'en'];

  latestNews: Observable<News[]>;
  language: Observable<string>;

  constructor(
    private store: Store,
    private backgroundService: BackgroundService,
  ) {}

  ngOnInit(): void {
    this.latestNews = this.store.select(getLatestNews);
    this.language = this.store.select(getLanguage);

    this.backgroundService.reset();
  }

  setLanguage(language: string): void {
    this.store.dispatch(LayoutActions.setLanguage({ language }));
  }
}
