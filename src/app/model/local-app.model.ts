import {HttpData} from '../store/state/http-data.model';
import {AppFile} from './app-file.model';
import {LocalAppVersion} from './local-app-version.enum';

export interface LocalApp {
  readonly appId: number;
  readonly files: HttpData<AppFile[]>;
  readonly version: LocalAppVersion;
  readonly outdatedFilePaths: string[];
  readonly updateProgress: number;
  readonly isStarting: boolean;
}
