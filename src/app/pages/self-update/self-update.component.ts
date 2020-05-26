import {Component, OnInit} from '@angular/core';

import {Observable} from 'rxjs';

import {SelfUpdateStoreFacadeService} from '../../core/services/self-update-store-facade/self-update-store-facade.service';

@Component({
  selector: 'ds-self-update',
  templateUrl: './self-update.component.html',
  styleUrls: ['./self-update.component.scss']
})
export class SelfUpdateComponent implements OnInit {

  isSelfUpdateAvailable: Observable<boolean>;
  isSelfUpdateDownloaded: Observable<boolean>;

  constructor(private selfUpdateStoreFacadeService: SelfUpdateStoreFacadeService) {
  }

  ngOnInit(): void {
    this.isSelfUpdateAvailable = this.selfUpdateStoreFacadeService.isSelfUpdateAvailable();
    this.isSelfUpdateDownloaded = this.selfUpdateStoreFacadeService.isSelfUpdateDownloaded();
  }

  restartAndInstall(): void {
    this.selfUpdateStoreFacadeService.restartAndInstall();
  }
}
