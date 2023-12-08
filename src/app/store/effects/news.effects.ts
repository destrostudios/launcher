import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import { NewsHttpService } from '../../core/services/news-http/news-http.service';
import * as NewsActions from '../actions/news.actions';
import { NewsState } from '../state/news-state.model';

@Injectable()
export class NewsEffects {
  constructor(
    private actions: Actions,
    private newsStore: Store<NewsState>,
    private newsHttpService: NewsHttpService,
  ) {}

  loadLatestNews = createEffect(() =>
    this.actions.pipe(
      ofType(NewsActions.loadLatestNews),
      switchMap(() =>
        this.newsHttpService.getLatestNews(3).pipe(
          map((news) => NewsActions.loadLatestNewsSuccessful({ news })),
          catchError((error) => of(NewsActions.loadLatestNewsError({ error }))),
        ),
      ),
    ),
  );
}
