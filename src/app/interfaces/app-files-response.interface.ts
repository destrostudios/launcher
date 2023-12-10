import { AppFile } from './app-file.interface';

export interface AppFilesResponse {
  readonly files: AppFile[];
  readonly protections: string[];
}
