import {HttpData} from '../store/state/http-data.model';
import {AppFilesResponse} from './app-files-response.model';
import {LocalAppVersion} from './local-app-version.enum';

export interface LocalApp {
  readonly appId: number;
  readonly files: HttpData<AppFilesResponse>;
  readonly version: LocalAppVersion;
  readonly outdatedFileIds: number[];
  readonly localFilesToBeDeleted: string[];
  readonly updateProgress: number;
}
