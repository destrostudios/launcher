import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';

import {Observable} from 'rxjs';

import {Configs} from '../../../model/configs.model';
import {MASTERSERVER_URL} from '../../injection-tokens';

@Injectable()
export class ConfigHttpService {

  constructor(
    private httpClient: HttpClient,
    @Inject(MASTERSERVER_URL) private masterserverUrl: string
  ) { }

  getClientConfigs(): Observable<Configs> {
    return this.httpClient.get<Configs>(this.masterserverUrl + '/api/config/client');
  }
}