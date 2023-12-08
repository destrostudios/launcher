import { App } from '../../model/app.model';
import { LocalApp } from '../../model/local-app.model';
import { HttpData } from './http-data.model';

export interface AppState {
  readonly apps: HttpData<App[]>;
  readonly localApps: LocalApp[];
  readonly displayHiddenAppsInStore: boolean;
  readonly selectedAppId_Store: number;
  readonly selectedAppId_Library: number;
  readonly librarySearchText: string;
  readonly startingAppId: number;
}
