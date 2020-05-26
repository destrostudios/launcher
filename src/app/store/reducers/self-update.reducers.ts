import {Action} from 'rxjs/internal/scheduler/Action';

import {createReducer, on} from '@ngrx/store';

import * as SelfUpdateActions from '../actions/self-update.actions';
import {SelfUpdateState} from '../state/self-update-state.model';

const initialState: SelfUpdateState = {
  isSelfUpdateAvailable: null,
  isSelfUpdateDownloaded: null,
};

const reducer = createReducer(
  initialState,
  on(SelfUpdateActions.setAvailable, (state, { isSelfUpdateAvailable }) => ({
    ...state,
    isSelfUpdateAvailable,
    isSelfUpdateDownloaded: (isSelfUpdateAvailable ? false : null)
  })),
  on(SelfUpdateActions.setDownloaded, (state, { isSelfUpdateDownloaded }) => ({
    ...state,
    isSelfUpdateDownloaded
  })),
);

// @ts-ignore
export function selfUpdateReducer(state: SelfUpdateState | undefined, action: Action) {
  return reducer(state, action);
}
