import {App} from '../../../model/app.model';
import {AppFile} from '../../../model/app-file.model';
import {LocalApp} from '../../../model/local-app.model';

export function getApp(apps: App[], id: number): App {
  return apps.find(app => app.id === id);
}

export function getPreselectedApp(apps: App[]): App {
  return ((apps.length > 0) ? apps[0] : null);
}

export function searchApps(apps: App[], searchText: string): App[] {
  const lowercaseSearchText = searchText.toLowerCase();
  return apps.filter(app => app.name.toLowerCase().indexOf(lowercaseSearchText) !== -1);
}

export function updateLocalApps(localApps: LocalApp[], appId: number, updatedLocalApp: (LocalApp) => LocalApp): LocalApp[] {
  const otherLocalApps = [];
  let currentLocalApp: LocalApp;
  localApps.forEach(localApp => {
    if (localApp.appId === appId) {
      currentLocalApp = localApp;
    } else {
      otherLocalApps.push(localApp);
    }
  });
  if (!currentLocalApp) {
    currentLocalApp = {
      appId,
      files: null,
      version: null,
      outdatedFileIds: null,
      localFilesToBeDeleted: null,
      updateProgress: null
    };
  }
  return [ ...otherLocalApps, updatedLocalApp(currentLocalApp) ];
}

export function getLocalApp(localApps: LocalApp[], appId: number): LocalApp {
  return localApps.find(localApp => localApp.appId === appId);
}

export function getOutdatedAppFiles(localApp: LocalApp): AppFile[] {
  return localApp.outdatedFileIds.map(appFileId => {
    return localApp.files.data.files.find(appFile => appFile.id === appFileId);
  });
}
