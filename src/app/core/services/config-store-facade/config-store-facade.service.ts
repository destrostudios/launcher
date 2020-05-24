import {Injectable} from '@angular/core';

import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import * as ConfigActions from '../../../store/actions/config.actions';
import {getFeaturedAppId} from '../../../store/selectors/config.selectors';
import {ConfigState} from '../../../store/state/config-state.model';

@Injectable()
export class ConfigStoreFacadeService {

  constructor(private store: Store<ConfigState>) {
  }

  getFeaturedGameId(): Observable<number> {
    return this.store.select(getFeaturedAppId);
  }

  loadClientConfigs(): void {
    this.store.dispatch(ConfigActions.loadClientConfigs());
  }
}
