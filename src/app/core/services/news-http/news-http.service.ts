import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';

import {News} from '../../../model/news.model';

@Injectable()
export class NewsHttpService {

  constructor(private httpClient: HttpClient) {
  }

  getLatestNews(limit: number): Observable<News[]> {
    return this.httpClient.get<News[]>('/api/news/latest', {
      params: {
        limit: String(limit)
      }
    });
  }
}
