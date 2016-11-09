import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

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
    LocalStorageService,
    LogInService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
