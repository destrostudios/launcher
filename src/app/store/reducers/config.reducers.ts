import { Action } from 'rxjs/internal/scheduler/Action';

import { createReducer, on } from '@ngrx/store';

import * as ConfigActions from '../actions/config.actions';
import { ConfigState } from '../state/config-state.interface';

const initialState: ConfigState = {
  clientConfigs: null,
};

const reducer = createReducer(
  initialState,
  on(ConfigActions.loadClientConfigs, (state) => ({
    ...state,
    clientConfigs: {
      isLoading: true,
      data: null,
      error: null,
    },
  })),
  on(ConfigActions.loadClientConfigsSuccessful, (state, { configs }) => ({
    ...state,
    clientConfigs: {
      isLoading: false,
      data: configs,
      error: null,
    },
  })),
  on(ConfigActions.loadClientConfigsError, (state, { error }) => ({
    ...state,
    clientConfigs: {
      isLoading: false,
      data: null,
      error,
    },
  })),
);

// @ts-ignore
export function configReducer(state: ConfigState | undefined, action: Action) {
  return reducer(state, action);
}
