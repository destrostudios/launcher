import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { App } from '../../interfaces/app.interface';
import { AppFilesResponse } from '../../interfaces/app-files-response.interface';
import { MASTERSERVER_URL } from '../injection-tokens';

@Injectable()
export class AppHttpService {
  constructor(
    private httpClient: HttpClient,
    @Inject(MASTERSERVER_URL) private masterserverUrl: string,
  ) {}

  getApps(): Observable<App[]> {
    return this.httpClient.get<App[]>(this.masterserverUrl + '/apps');
  }

  addToAccount(appId: number): Observable<void> {
    return this.httpClient.post<void>(
      this.masterserverUrl + '/apps/' + appId + '/addToAccount',
      null,
    );
  }

  removeFromAccount(appId: number): Observable<void> {
    return this.httpClient.post<void>(
      this.masterserverUrl + '/apps/' + appId + '/removeFromAccount',
      null,
    );
  }

  getAppFiles(appId: number): Observable<AppFilesResponse> {
    return this.httpClient.get<AppFilesResponse>(
      this.masterserverUrl + '/apps/' + appId + '/files',
    );
  }
}
