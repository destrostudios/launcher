import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { IpcService } from '../../core/services/ipc/ipc.service';
import * as SelfUpdateActions from '../actions/self-update.actions';
import { SelfUpdateState } from '../state/self-update-state.model';

@Injectable()
export class SelfUpdateEffects {
  constructor(
    private actions: Actions,
    private selfUpdateStore: Store<SelfUpdateState>,
    private ipcService: IpcService,
  ) {
    this.ipcService.on('selfUpdateAvailable', () => {
      this.selfUpdateStore.dispatch(
        SelfUpdateActions.setAvailable({ isSelfUpdateAvailable: true }),
      );
    });
    this.ipcService.on('selfUpdateNotAvailable', () => {
      this.selfUpdateStore.dispatch(
        SelfUpdateActions.setAvailable({ isSelfUpdateAvailable: false }),
      );
    });
    this.ipcService.on('selfUpdateDownloaded', () => {
      this.selfUpdateStore.dispatch(
        SelfUpdateActions.setDownloaded({ isSelfUpdateDownloaded: true }),
      );
    });
    this.ipcService.on('selfUpdateError', () => {
      this.selfUpdateStore.dispatch(
        SelfUpdateActions.setDownloaded({ isSelfUpdateDownloaded: false }),
      );
    });
  }

  restartAndInstall = createEffect(
    () =>
      this.actions.pipe(
        ofType(SelfUpdateActions.restartAndInstall),
        switchMap(() => {
          this.ipcService.send('restartAndInstall');
          return EMPTY;
        }),
      ),
    { dispatch: false },
  );
}
