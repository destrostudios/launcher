import {App} from '../../model/app.model';
import {HttpData} from './http-data.model';

export interface AppState {
  readonly apps: HttpData<App[]>;
  readonly selectedAppId_Store: number;
  readonly selectedAppId_Library: number;
  readonly librarySearchText: string;
}
