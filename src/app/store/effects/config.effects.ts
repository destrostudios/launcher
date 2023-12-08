import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import { ConfigHttpService } from '../../core/services/config-http.service';
import * as ConfigActions from '../actions/config.actions';

@Injectable()
export class ConfigEffects {
  constructor(
    private actions: Actions,
    private configHttpService: ConfigHttpService,
  ) {}

  loadLatestConfig = createEffect(() =>
    this.actions.pipe(
      ofType(ConfigActions.loadClientConfigs),
      switchMap(() =>
        this.configHttpService.getClientConfigs().pipe(
          map((configs) =>
            ConfigActions.loadClientConfigsSuccessful({ configs }),
          ),
          catchError((error) =>
            of(ConfigActions.loadClientConfigsError({ error })),
          ),
        ),
      ),
    ),
  );
}
