import { createSelector } from '@ngrx/store';

import { getApp, searchApps } from '../../core/util/app/app.util';
import {
  areAppsLoading,
  getApps,
  getLibrarySearchText,
  getSelectedApp_Store,
} from './app.selectors';
import { areClientConfigsLoading, getFeaturedAppId } from './config.selectors';
import { areLatestNewsLoading } from './news.selectors';
import {
  getCurrentUser,
  getOwnedAppIds,
  isSaltClientLoading,
  isSessionIdLoading,
} from './user.selectors';

export const isLoginLoading = createSelector(
  isSaltClientLoading,
  isSessionIdLoading,
  getCurrentUser,
  areClientConfigsLoading,
  areLatestNewsLoading,
  areAppsLoading,
  (
    saltClientLoading,
    sessionIdLoading,
    currentUser,
    clientConfigsLoading,
    latestNewsLoading,
    appsLoading,
  ) => {
    return Boolean(
      saltClientLoading ||
        sessionIdLoading ||
        (currentUser &&
          (clientConfigsLoading || latestNewsLoading || appsLoading)),
    );
  },
);

export const getFeaturedApp = createSelector(
  getFeaturedAppId,
  getApps,
  (featuredAppId, apps) => {
    if (!featuredAppId || !apps) {
      return null;
    }
    return getApp(apps, featuredAppId);
  },
);

export const getOwnedApps = createSelector(
  getOwnedAppIds,
  getApps,
  (ownedAppIds, apps) => {
    if (!ownedAppIds || !apps) {
      return null;
    }
    return ownedAppIds.map((appId) => getApp(apps, appId));
  },
);

export const hasOwnedApps = createSelector(
  getOwnedApps,
  (ownedApps) => ownedApps && ownedApps.length > 0,
);

export const getDisplayedLibraryApps = createSelector(
  getOwnedApps,
  getLibrarySearchText,
  (ownedApps, librarySearchText) => {
    if (!ownedApps) {
      return null;
    }
    return searchApps(ownedApps, librarySearchText);
  },
);

export const isSelectedAppOwned_Store = createSelector(
  getSelectedApp_Store,
  getOwnedAppIds,
  (selectedApp_Store, ownedAppIds) => {
    if (!selectedApp_Store || !ownedAppIds) {
      return null;
    }
    return ownedAppIds.includes(selectedApp_Store.id);
  },
);
