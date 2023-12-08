import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as AppActions from '../../../store/actions/app.actions';
import * as UserActions from '../../../store/actions/user.actions';
import { getLogin } from '../../../store/selectors/user.selectors';

@Component({
  selector: 'ds-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  login: Observable<string>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.login = this.store.select(getLogin);
  }

  onLogoClick(event: MouseEvent): void {
    // Middle
    if (event.button === 1) {
      this.store.dispatch(AppActions.toggleHiddenAppsInStore());
    }
  }

  logout() {
    this.store.dispatch(UserActions.logout());
  }
}
