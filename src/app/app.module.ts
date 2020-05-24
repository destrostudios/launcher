import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from './core/core.module';
import {PagesModule} from './pages/pages.module';

@NgModule({
  imports: [
    BrowserModule,

    AppRoutingModule,
    CoreModule,
    PagesModule,
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
