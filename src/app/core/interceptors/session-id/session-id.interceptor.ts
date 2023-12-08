import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { first, mergeMap } from 'rxjs/operators';

import { UserStoreFacadeService } from '../../services/user-store-facade/user-store-facade.service';

@Injectable()
export class SessionIdInterceptor implements HttpInterceptor {
  constructor(public userStoreFacadeService: UserStoreFacadeService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return this.userStoreFacadeService.getSessionId().pipe(
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
