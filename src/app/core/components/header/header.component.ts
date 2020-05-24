import {Component, OnInit} from '@angular/core';

import {Observable} from 'rxjs';

import {UserStoreFacadeService} from '../../services/user-store-facade/user-store-facade.service';

@Component({
  selector: 'ds-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  login: Observable<string>;

  constructor(private userStoreFacadeService: UserStoreFacadeService) {
  }

  ngOnInit(): void {
    this.login = this.userStoreFacadeService.getLogin();
  }

  logout() {
    this.userStoreFacadeService.logout();
  }
}
