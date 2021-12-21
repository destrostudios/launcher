import {Component, OnInit} from '@angular/core';

import {Observable} from 'rxjs';

import {AppStoreFacadeService} from '../../services/app-store-facade/app-store-facade.service';
import {UserStoreFacadeService} from '../../services/user-store-facade/user-store-facade.service';

@Component({
  selector: 'ds-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  login: Observable<string>;

  constructor(
      private userStoreFacadeService: UserStoreFacadeService,
      private appStoreFacadeService: AppStoreFacadeService,
  ) { }

  ngOnInit(): void {
    this.login = this.userStoreFacadeService.getLogin();
  }

  onLogoClick(event: MouseEvent): void {
    // Middle
    if (event.button === 1) {
      this.appStoreFacadeService.toggleHiddenAppsInStore();
    }
  }

  logout() {
    this.userStoreFacadeService.logout();
  }
}
