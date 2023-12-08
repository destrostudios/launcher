import { Configs } from '../../model/configs.model';
import { HttpData } from './http-data.model';

export interface ConfigState {
  readonly clientConfigs: HttpData<Configs>;
}
