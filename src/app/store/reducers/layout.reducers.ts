import { Action } from 'rxjs/internal/scheduler/Action';

import { createReducer, on } from '@ngrx/store';

import * as LayoutActions from '../actions/layout.actions';
import { LayoutState } from '../state/layout-state.model';

const initialState: LayoutState = {
  language: 'en',
  route: null,
  isLoginOrRegistrationShown: true,
  isAppAdditionToAccountErrorShown: false,
  isAppRemovalFromAccountErrorShown: false,
};

const reducer = createReducer(
  initialState,
  on(LayoutActions.setLanguage, (state, { language }) => ({
    ...state,
    language,
  })),
  on(LayoutActions.navigate, (state, { route }) => ({ ...state, route })),
  on(LayoutActions.openLogin, (state) => ({
    ...state,
    isLoginOrRegistrationShown: true,
  })),
  on(LayoutActions.openRegistration, (state) => ({
    ...state,
    isLoginOrRegistrationShown: false,
  })),
  on(LayoutActions.showAppAdditionToAccountError, (state) => ({
    ...state,
    isAppAdditionToAccountErrorShown: true,
  })),
  on(LayoutActions.hideAppAdditionToAccountError, (state) => ({
    ...state,
    isAppAdditionToAccountErrorShown: false,
  })),
  on(LayoutActions.showAppRemovalFromAccountError, (state) => ({
    ...state,
    isAppRemovalFromAccountErrorShown: true,
  })),
  on(LayoutActions.hideAppRemovalFromAccountError, (state) => ({
    ...state,
    isAppRemovalFromAccountErrorShown: false,
  })),
);

// @ts-ignore
export function layoutReducer(state: LayoutState | undefined, action: Action) {
  return reducer(state, action);
}
