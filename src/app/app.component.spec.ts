import { AUTH_PROVIDERS, JwtHelper } from 'angular2-jwt';
import { TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { LocalStorageService } from './utils/local-storage.service';
import { AppComponent } from './app.component';
import { LogInService } from './log-in.service';
import { ContextDirective } from './context.directive';
import { RandomUserService } from './random-user.service';

const title = 'Angular JWT POC!';

describe('App: AngularJwt', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ContextDirective,
      ],
      imports: [
        FormsModule,
        HttpModule,
      ],
      providers: [
        LocalStorageService,
        LogInService,
        RandomUserService,
        AUTH_PROVIDERS,
        JwtHelper,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app works!'`, async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual(title);
  }));

  it('should render title in a h1 tag', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(title);
  }));
});
