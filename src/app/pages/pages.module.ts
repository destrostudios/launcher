import {NgModule} from '@angular/core';

import {SharedModule} from '../shared/shared.module';
import {AppHubComponent} from '../shared/components/app-hub/app-hub.component';
import {AuthenticationComponent} from './authentication/authentication.component';
import {LoginComponent} from './authentication/login/login.component';
import {RegistrationComponent} from './authentication/registration/registration.component';
import {HomeComponent} from './home/home.component';
import {NewsComponent} from './home/news/news.component';
import {LibraryComponent} from './library/library.component';
import {LibraryTileComponent} from './library/library-tile/library-tile.component';
import {OfflineComponent} from './offline/offline.component';
import {SelfUpdateComponent} from './self-update/self-update.component';
import {StoreComponent} from './store/store.component';
import {StoreTileComponent} from './store/store-tile/store-tile.component';
import {StoreAppComponent} from './store-app/store-app.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    AppHubComponent,
    AuthenticationComponent,
    HomeComponent,
    LibraryComponent,
    LibraryTileComponent,
    LoginComponent,
    NewsComponent,
    OfflineComponent,
    RegistrationComponent,
    SelfUpdateComponent,
    StoreComponent,
    StoreAppComponent,
    StoreTileComponent
  ]
})
export class PagesModule { }
