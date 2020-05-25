import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';

import {App} from '../../../model/app.model';
import {AppFile} from '../../../model/app-file.model';

@Injectable()
export class AppHttpService {

  constructor(private httpClient: HttpClient) {
  }

  getApps(): Observable<App[]> {
    return this.httpClient.get<App[]>('/api/apps');
  }

  addToAccount(appId: number): Observable<void> {
    return this.httpClient.get<void>('/api/apps/' + appId + '/addToAccount');
  }

  removeFromAccount(appId: number): Observable<void> {
    return this.httpClient.get<void>('/api/apps/' + appId + '/removeFromAccount');
  }

  getAppFiles(appId: number): Observable<AppFile[]> {
    return this.httpClient.get<AppFile[]>('/api/apps/' + appId + '/files');
  }
}
