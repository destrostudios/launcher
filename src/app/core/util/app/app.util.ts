import {App} from '../../../model/app.model';

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
