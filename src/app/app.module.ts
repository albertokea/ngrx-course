import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgOptimizedImage } from '@angular/common'
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { getEnvironmentProvider } from './core/utils/environment.token';
import { environment } from 'src/environments/environment';

import { SharedAuthModule } from './shared/auth/shared-auth.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgOptimizedImage,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedAuthModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    getEnvironmentProvider(environment)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
