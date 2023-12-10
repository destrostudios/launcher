import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { LoginDto } from '../../interfaces/login.dto.interface';
import { RegistrationDto } from '../../interfaces/registration.dto.interface';
import { ResetPasswordDto } from '../../interfaces/reset-password.dto.interface';
import { User } from '../../interfaces/user.interface';
import { MASTERSERVER_URL } from '../injection-tokens';

@Injectable()
export class UserHttpService {
  constructor(
    private httpClient: HttpClient,
    @Inject(MASTERSERVER_URL) private masterserverUrl: string,
  ) {}

  register(registrationDto: RegistrationDto): Observable<void> {
    return this.httpClient.post<void>(
      this.masterserverUrl + '/users/register',
      registrationDto,
    );
  }

  getSaltClient(login: string): Observable<string> {
    return this.httpClient.get(
      this.masterserverUrl +
        '/users/' +
        encodeURIComponent(login) +
        '/saltClient',
      { responseType: 'text' },
    );
  }

  login(loginDto: LoginDto): Observable<string> {
    return this.httpClient.post(
      this.masterserverUrl + '/users/login',
      loginDto,
      { responseType: 'text' },
    );
  }

  sendEmailConfirmationEmail(login: string): Observable<void> {
    return this.httpClient.post<void>(
      this.masterserverUrl +
        '/users/' +
        encodeURIComponent(login) +
        '/sendEmailConfirmationEmail',
      null,
    );
  }

  confirmEmail(login: string, emailSecret: string): Observable<void> {
    return this.httpClient.post<void>(
      this.masterserverUrl +
        '/users/' +
        encodeURIComponent(login) +
        '/confirmEmail',
      emailSecret,
    );
  }

  sendPasswordResetEmail(login: string): Observable<void> {
    return this.httpClient.post<void>(
      this.masterserverUrl +
        '/users/' +
        encodeURIComponent(login) +
        '/sendPasswordResetEmail',
      null,
    );
  }

  resetPassword(
    login: string,
    resetPasswordDto: ResetPasswordDto,
  ): Observable<void> {
    return this.httpClient.post<void>(
      this.masterserverUrl +
        '/users/' +
        encodeURIComponent(login) +
        '/resetPassword',
      resetPasswordDto,
    );
  }

  getUser(userId: number): Observable<User> {
    return this.httpClient.get<User>(this.masterserverUrl + '/users/' + userId);
  }
}
