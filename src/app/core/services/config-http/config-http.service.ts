import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';

import {Configs} from '../../../model/configs.model';

@Injectable()
export class ConfigHttpService {

  constructor(private httpClient: HttpClient) {
  }

  getClientConfigs(): Observable<Configs> {
    return this.httpClient.get<Configs>('/api/config/client');
  }
}
