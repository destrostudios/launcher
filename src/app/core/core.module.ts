import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';

import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {environment} from '../../environments/environment';
import {SharedModule} from '../shared/shared.module';
import {AppEffects} from '../store/effects/app.effects';
import {ConfigEffects} from '../store/effects/config.effects';
import {LayoutEffects} from '../store/effects/layout.effects';
import {NewsEffects} from '../store/effects/news.effects';
import {UserEffects} from '../store/effects/user.effects';
import {appReducer} from '../store/reducers/app.reducers';
import {configReducer} from '../store/reducers/config.reducers';
import {layoutReducer} from '../store/reducers/layout.reducers';
import {newsReducer} from '../store/reducers/news.reducers';
import {userReducer} from '../store/reducers/user.reducers';
import {FullLoaderComponent} from './components/full-loader/full-loader.component';
import {HeaderComponent} from './components/header/header.component';
import {WindowControlsComponent} from './components/window-controls/window-controls.component';
import {SessionIdInterceptor} from './interceptors/session-id/session-id.interceptor';
import {AppHttpService} from './services/app-http/app-http.service';
import {AppStoreFacadeService} from './services/app-store-facade/app-store-facade.service';
import {ConfigHttpService} from './services/config-http/config-http.service';
import {ConfigStoreFacadeService} from './services/config-store-facade/config-store-facade.service';
import {IpcService} from './services/ipc/ipc.service';
import {LayoutStoreFacadeService} from './services/layout-store-facade/layout-store-facade.service';
import {NewsHttpService} from './services/news-http/news-http.service';
import {NewsStoreFacadeService} from './services/news-store-facade/news-store-facade.service';
import {UserHttpService} from './services/user-http/user-http.service';
import {UserStoreFacadeService} from './services/user-store-facade/user-store-facade.service';
import {MASTERSERVER_URL} from './injection-tokens';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/translations/', '.json');
}

@NgModule({
  imports: [
    HttpClientModule,

    StoreModule.forRoot({}),
    StoreModule.forFeature('app', appReducer),
    StoreModule.forFeature('config', configReducer),
    StoreModule.forFeature('layout', layoutReducer),
    StoreModule.forFeature('news', newsReducer),
    StoreModule.forFeature('user', userReducer),
    EffectsModule.forRoot([ AppEffects, ConfigEffects, LayoutEffects, NewsEffects, UserEffects ]),
    StoreDevtoolsModule.instrument({ maxAge: 50 }),

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

    SharedModule,
  ],
  declarations: [
    FullLoaderComponent,
    HeaderComponent,
    WindowControlsComponent,
  ],
  providers: [
    AppHttpService,
    AppStoreFacadeService,
    ConfigHttpService,
    ConfigStoreFacadeService,
    IpcService,
    LayoutStoreFacadeService,
    NewsHttpService,
    NewsStoreFacadeService,
    UserHttpService,
    UserStoreFacadeService,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: SessionIdInterceptor,
      multi: true
    },
    {
      provide: MASTERSERVER_URL,
      useValue: (environment.production ? 'http://localhost:8080' : '')
    }
  ],
  exports: [
    FullLoaderComponent,
    HeaderComponent,
    WindowControlsComponent
  ]
})
export class CoreModule { }
