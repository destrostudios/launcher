import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';

import {Observable} from 'rxjs';

import {App} from '../../../model/app.model';
import {AppFile} from '../../../model/app-file.model';
import {MASTERSERVER_URL} from '../../injection-tokens';

@Injectable()
export class AppHttpService {

  constructor(
    private httpClient: HttpClient,
    @Inject(MASTERSERVER_URL) private masterserverUrl: string
  ) { }

  getApps(): Observable<App[]> {
    return this.httpClient.get<App[]>(this.masterserverUrl + '/api/apps');
  }

  addToAccount(appId: number): Observable<void> {
    return this.httpClient.get<void>(this.masterserverUrl + '/api/apps/' + appId + '/addToAccount');
  }

  removeFromAccount(appId: number): Observable<void> {
    return this.httpClient.get<void>(this.masterserverUrl + '/api/apps/' + appId + '/removeFromAccount');
  }

  getAppFiles(appId: number): Observable<AppFile[]> {
    return this.httpClient.get<AppFile[]>(this.masterserverUrl + '/api/apps/' + appId + '/files');
  }
}
