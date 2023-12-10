import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first, mergeMap } from 'rxjs/operators';

import { getAuthToken } from '../../store/selectors/user.selectors';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(public store: Store) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return this.store.select(getAuthToken).pipe(
      first(),
      mergeMap((authToken) => {
        if (authToken != null) {
          request = request.clone({
            setHeaders: {
              Authorization: 'Bearer ' + authToken,
            },
          });
        }
        return next.handle(request);
      }),
    );
  }
}
