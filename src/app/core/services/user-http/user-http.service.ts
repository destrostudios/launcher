import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';

import {Registration} from '../../../model/registration.model';
import {SafeCredentials} from '../../../model/safe-credentials.model';
import {User} from '../../../model/user.model';

@Injectable()
export class UserHttpService {

  constructor(private httpClient: HttpClient) {
  }

  register(registration: Registration): Observable<void> {
    return this.httpClient.post<void>('/api/users/register', registration);
  }

  getSaltClient(login: string): Observable<string> {
    return this.httpClient.post('/api/users/saltClient', login, { responseType: 'text' });
  }

  login(safeCredentials: SafeCredentials): Observable<string> {
    return this.httpClient.post('/api/users/login', safeCredentials, { responseType: 'text' });
  }

  getUser(): Observable<User> {
    return this.httpClient.get<User>('/api/users/bySession');
  }
}
