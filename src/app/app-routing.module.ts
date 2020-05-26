import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthenticationComponent} from './pages/authentication/authentication.component';
import {HomeComponent} from './pages/home/home.component';
import {LibraryComponent} from './pages/library/library.component';
import {OfflineComponent} from './pages/offline/offline.component';
import {SelfUpdateComponent} from './pages/self-update/self-update.component';
import {StoreComponent} from './pages/store/store.component';
import {StoreAppComponent} from './pages/store-app/store-app.component';

const routes: Routes = [
  { path: 'update', component: SelfUpdateComponent },
  { path: 'authentication', component: AuthenticationComponent },
  { path: 'offline', component: OfflineComponent },
  { path: 'home', component: HomeComponent },
  { path: 'store', component: StoreComponent },
  { path: 'store/:appId', component: StoreAppComponent },
  { path: 'library', component: LibraryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
