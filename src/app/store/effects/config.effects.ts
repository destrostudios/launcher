import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import { ConfigHttpService } from '../../core/services/config-http/config-http.service';
import * as ConfigActions from '../actions/config.actions';
import { ConfigState } from '../state/config-state.model';

@Injectable()
export class ConfigEffects {
  constructor(
    private actions: Actions,
    private configStore: Store<ConfigState>,
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
