
import { TestBed, async, inject } from '@angular/core/testing';
import { RandomUserService } from './random-user.service';
import { CoreModule } from '../core.module';

describe('RandomUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
      ],
      providers: [
        RandomUserService,
      ],
    });
  });

  it('should ...', inject([RandomUserService], (service: RandomUserService) => {
    expect(service).toBeTruthy();
  }));
});
