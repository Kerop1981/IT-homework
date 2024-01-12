import {ApplicationConfig, importProvidersFrom, isDevMode} from '@angular/core';
import {provideRouter} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {appRoutes} from './app.routes';
import {provideAnimations} from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {UserEffects} from "./store/user.effects";
import * as fromUserReducer from '../app/store/user.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    importProvidersFrom(HttpClientModule),
    provideAnimations(),
    // ngrx
    importProvidersFrom(
      StoreModule.forRoot({}),
      StoreModule.forFeature('users', fromUserReducer.userReducer),
      EffectsModule.forRoot([]),
      EffectsModule.forFeature(UserEffects),
      StoreDevtoolsModule.instrument({
        maxAge: 25,
        logOnly: false,
      }),
    )
  ],
};
