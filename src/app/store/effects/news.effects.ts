import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import { NewsHttpService } from '../../core/services/news-http.service';
import * as NewsActions from '../actions/news.actions';

@Injectable()
export class NewsEffects {
  constructor(
    private actions: Actions,
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
