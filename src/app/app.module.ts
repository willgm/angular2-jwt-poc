import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';

import { AppComponent } from './app.component';
import { LocalStorageService } from './utils/local-storage.service';
import { LogInService } from './log-in.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    AUTH_PROVIDERS,
    LocalStorageService,
    LogInService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
