import { AppFile } from './app-file.model';

export interface AppFilesResponse {
  readonly files: AppFile[];
  readonly protections: string[];
}
