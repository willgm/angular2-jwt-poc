/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RandomUserService } from './random-user.service';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { HttpModule } from '@angular/http';

describe('RandomUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [RandomUserService, AUTH_PROVIDERS],
    });
  });

  it('should ...', inject([RandomUserService], (service: RandomUserService) => {
    expect(service).toBeTruthy();
  }));
});
