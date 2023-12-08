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

import { getSessionId } from '../../store/selectors/user.selectors';

@Injectable()
export class SessionIdInterceptor implements HttpInterceptor {
  constructor(public store: Store) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return this.store.select(getSessionId).pipe(
      first(),
      mergeMap((sessionId) => {
        if (sessionId != null) {
          request = request.clone({
            setHeaders: {
              sessionId,
            },
          });
        }
        return next.handle(request);
      }),
    );
  }
}
