import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { News } from '../../../model/news.model';
import * as NewsActions from '../../../store/actions/news.actions';
import { getLatestNews } from '../../../store/selectors/news.selectors';
import { NewsState } from '../../../store/state/news-state.model';

@Injectable()
export class NewsStoreFacadeService {
  constructor(private store: Store<NewsState>) {}

  getLatestNews(): Observable<News[]> {
    return this.store.select(getLatestNews);
  }

  loadLatestNews(): void {
    this.store.dispatch(NewsActions.loadLatestNews());
  }
}
