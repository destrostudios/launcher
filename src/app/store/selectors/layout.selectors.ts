import { createFeatureSelector, createSelector } from '@ngrx/store';

import { LayoutState } from '../state/layout-state.interface';

const getLayoutState = createFeatureSelector<LayoutState>('layout');

export const getLanguage = createSelector(
  getLayoutState,
  (state) => state.language,
);

const getRoute = createSelector(getLayoutState, (state) => state.route);

export const isHeaderShown = createSelector(
  getRoute,
  (route) =>
    route !== 'update' &&
    !route.startsWith('authentication/') &&
    route !== 'offline',
);

export const isAppAdditionToAccountErrorShown = createSelector(
  getLayoutState,
  (state) => state.isAppAdditionToAccountErrorShown,
);

export const isAppRemovalFromAccountErrorShown = createSelector(
  getLayoutState,
  (state) => state.isAppRemovalFromAccountErrorShown,
);
