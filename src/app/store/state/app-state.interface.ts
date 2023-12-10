import { App } from '../../interfaces/app.interface';
import { LocalApp } from '../../interfaces/local-app.interface';
import { HttpData } from './http-data.interface';

export interface AppState {
  readonly apps: HttpData<App[]>;
  readonly localApps: LocalApp[];
  readonly displayHiddenAppsInStore: boolean;
  readonly selectedAppId_Store: number;
  readonly selectedAppId_Library: number;
  readonly librarySearchText: string;
  readonly startingAppId: number;
}
