import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Registration } from '../../../model/registration.model';
import { SafeCredentials } from '../../../model/safe-credentials.model';
import { User } from '../../../model/user.model';
import { MASTERSERVER_URL } from '../../injection-tokens';

@Injectable()
export class UserHttpService {
  constructor(
    private httpClient: HttpClient,
    @Inject(MASTERSERVER_URL) private masterserverUrl: string,
  ) {}

  register(registration: Registration): Observable<void> {
    return this.httpClient.post<void>(
      this.masterserverUrl + '/users/register',
      registration,
    );
  }

  getSaltClient(login: string): Observable<string> {
    return this.httpClient.post(
      this.masterserverUrl + '/users/saltClient',
      login,
      { responseType: 'text' },
    );
  }

  login(safeCredentials: SafeCredentials): Observable<string> {
    return this.httpClient.post(
      this.masterserverUrl + '/users/login',
      safeCredentials,
      { responseType: 'text' },
    );
  }

  getUser(): Observable<User> {
    return this.httpClient.get<User>(this.masterserverUrl + '/users/bySession');
  }

  getAuthToken(): Observable<string> {
    return this.httpClient.get(this.masterserverUrl + '/authToken', {
      responseType: 'text',
    });
  }
}
