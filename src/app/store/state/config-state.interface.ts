import { Configs } from '../../interfaces/configs.interface';
import { HttpData } from './http-data.interface';

export interface ConfigState {
  readonly clientConfigs: HttpData<Configs>;
}
