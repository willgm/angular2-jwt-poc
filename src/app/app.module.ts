import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { AUTH_PROVIDERS, AuthHttp, AuthConfig, JwtHelper } from 'angular2-jwt';

import { AppComponent } from './app.component';
import { LocalStorageService } from './utils/local-storage.service';
import { LogInService } from './log-in.service';
import { ContextDirective } from './context.directive';

function getAuthHttp(http, logInService) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => logInService.getToken()),
    noJwtError: true,
  }), http);
}

@NgModule({
  declarations: [
    AppComponent,
    ContextDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    AUTH_PROVIDERS,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http, LogInService]
    },
    LocalStorageService,
    LogInService,
    JwtHelper,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
