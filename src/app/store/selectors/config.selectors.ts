import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ConfigState } from '../state/config-state.interface';

const getConfigState = createFeatureSelector<ConfigState>('config');

export const areClientConfigsLoading = createSelector(
  getConfigState,
  (state) => (state.clientConfigs ? state.clientConfigs.isLoading : null),
);

const getClientConfigs = createSelector(getConfigState, (state) =>
  state.clientConfigs ? state.clientConfigs.data : null,
);

export const getFeaturedAppId = createSelector(
  getClientConfigs,
  (clientConfigs) =>
    clientConfigs ? Number(clientConfigs.featured_app_id) : null,
);
