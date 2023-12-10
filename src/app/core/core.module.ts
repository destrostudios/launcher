import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { environment } from '../../environments/environment';
import { SharedModule } from '../shared/shared.module';
import { AppEffects } from '../store/effects/app.effects';
import { ConfigEffects } from '../store/effects/config.effects';
import { LayoutEffects } from '../store/effects/layout.effects';
import { NewsEffects } from '../store/effects/news.effects';
import { SelfUpdateEffects } from '../store/effects/self-update.effects';
import { UserEffects } from '../store/effects/user.effects';
import { appReducer } from '../store/reducers/app.reducers';
import { configReducer } from '../store/reducers/config.reducers';
import { layoutReducer } from '../store/reducers/layout.reducers';
import { newsReducer } from '../store/reducers/news.reducers';
import { selfUpdateReducer } from '../store/reducers/self-update.reducers';
import { userReducer } from '../store/reducers/user.reducers';
import { HeaderComponent } from './components/header/header.component';
import { WindowControlsComponent } from './components/window-controls/window-controls.component';
import { AuthTokenInterceptor } from './interceptors/auth-token.interceptor';
import { AppHttpService } from './services/app-http.service';
import { BackgroundService } from './services/background.service';
import { ConfigHttpService } from './services/config-http.service';
import { IpcService } from './services/ipc.service';
import { NewsHttpService } from './services/news-http.service';
import { UserHttpService } from './services/user-http.service';
import { MASTERSERVER_URL } from './injection-tokens';

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
    StoreModule.forFeature('selfUpdate', selfUpdateReducer),
    StoreModule.forFeature('user', userReducer),
    EffectsModule.forRoot([
      AppEffects,
      ConfigEffects,
      LayoutEffects,
      NewsEffects,
      SelfUpdateEffects,
      UserEffects,
    ]),

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),

    SharedModule,
  ],
  declarations: [HeaderComponent, WindowControlsComponent],
  providers: [
    AppHttpService,
    BackgroundService,
    ConfigHttpService,
    IpcService,
    NewsHttpService,
    UserHttpService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true,
    },
    {
      provide: MASTERSERVER_URL,
      useValue: environment.masterserverUrl,
    },
  ],
  exports: [HeaderComponent, WindowControlsComponent],
})
export class CoreModule {}
