import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { IpcService } from '../../core/services/ipc.service';
import * as SelfUpdateActions from '../actions/self-update.actions';

@Injectable()
export class SelfUpdateEffects {
  constructor(
    private actions: Actions,
    private store: Store,
    private ipcService: IpcService,
  ) {
    this.ipcService.on('selfUpdateAvailable', () => {
      this.store.dispatch(
        SelfUpdateActions.setAvailable({ isSelfUpdateAvailable: true }),
      );
    });
    this.ipcService.on('selfUpdateNotAvailable', () => {
      this.store.dispatch(
        SelfUpdateActions.setAvailable({ isSelfUpdateAvailable: false }),
      );
    });
    this.ipcService.on('selfUpdateDownloaded', () => {
      this.store.dispatch(
        SelfUpdateActions.setDownloaded({ isSelfUpdateDownloaded: true }),
      );
    });
    this.ipcService.on('selfUpdateError', () => {
      this.store.dispatch(
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
