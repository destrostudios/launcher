import { createFeatureSelector, createSelector } from '@ngrx/store';

import { SelfUpdateState } from '../state/self-update-state.model';

const getSelfUpdateState = createFeatureSelector<SelfUpdateState>('selfUpdate');

export const isSelfUpdateAvailable = createSelector(
  getSelfUpdateState,
  (state) => state.isSelfUpdateAvailable,
);

export const isSelfUpdateDownloaded = createSelector(
  getSelfUpdateState,
  (state) => state.isSelfUpdateDownloaded,
);
