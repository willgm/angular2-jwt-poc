import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from './local-storage/local-storage.service';
import { AuthHttp, AuthConfig, AUTH_PROVIDERS, JwtHelper } from 'angular2-jwt';
import { Http, HttpModule } from '@angular/http';
import { LogInService } from './log-in/log-in.service';
import { RandomUserService } from './random-user/random-user.service';

function getAuthHttp(http, logInService) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => logInService.getToken()),
    noJwtError: true,
  }), http);
}

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
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
    RandomUserService,
    JwtHelper,
  ],
  declarations: [
  ],
  exports: [
  ],
})
export class CoreModule {

  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

}
