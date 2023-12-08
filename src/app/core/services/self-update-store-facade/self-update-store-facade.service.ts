import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as SelfUpdateActions from '../../../store/actions/self-update.actions';
import {
  isSelfUpdateAvailable,
  isSelfUpdateDownloaded,
} from '../../../store/selectors/self-update.selectors';
import { SelfUpdateState } from '../../../store/state/self-update-state.model';

@Injectable()
export class SelfUpdateStoreFacadeService {
  constructor(private store: Store<SelfUpdateState>) {}

  isSelfUpdateAvailable(): Observable<boolean> {
    return this.store.select(isSelfUpdateAvailable);
  }

  isSelfUpdateDownloaded(): Observable<boolean> {
    return this.store.select(isSelfUpdateDownloaded);
  }

  restartAndInstall(): void {
    this.store.dispatch(SelfUpdateActions.restartAndInstall());
  }
}
