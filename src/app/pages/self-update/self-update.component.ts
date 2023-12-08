import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as SelfUpdateActions from '../../store/actions/self-update.actions';
import {
  isSelfUpdateAvailable,
  isSelfUpdateDownloaded,
} from '../../store/selectors/self-update.selectors';

@Component({
  selector: 'ds-self-update',
  templateUrl: './self-update.component.html',
  styleUrls: ['./self-update.component.scss'],
})
export class SelfUpdateComponent implements OnInit {
  isSelfUpdateAvailable: Observable<boolean>;
  isSelfUpdateDownloaded: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isSelfUpdateAvailable = this.store.select(isSelfUpdateAvailable);
    this.isSelfUpdateDownloaded = this.store.select(isSelfUpdateDownloaded);
  }

  restartAndInstall(): void {
    this.store.dispatch(SelfUpdateActions.restartAndInstall());
  }
}
