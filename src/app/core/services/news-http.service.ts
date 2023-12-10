import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { News } from '../.././interfaces/news.interface';
import { MASTERSERVER_URL } from '../injection-tokens';

@Injectable()
export class NewsHttpService {
  constructor(
    private httpClient: HttpClient,
    @Inject(MASTERSERVER_URL) private masterserverUrl: string,
  ) {}

  getLatestNews(limit: number): Observable<News[]> {
    return this.httpClient.get<News[]>(this.masterserverUrl + '/news/latest', {
      params: {
        limit: String(limit),
      },
    });
  }
}
