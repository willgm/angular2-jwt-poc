import { TestBed, async, inject } from '@angular/core/testing';

import { LogInService } from './log-in.service';
import { LocalStorageService } from './utils/local-storage.service';

const user = {name: 'name'}, token = 'tokentoken';

let subject:LogInService;

describe('Service: LogIn', () => {
  beforeEach(() => {
    spyOn(LocalStorageService.prototype, 'set');
    spyOn(LocalStorageService.prototype, 'get');
    spyOn(LocalStorageService.prototype, 'clear');
    TestBed.configureTestingModule({
      providers: [
        LogInService,
        LocalStorageService,
      ]
    });
    subject = TestBed.get(LogInService);
  });

  describe('when loging in', () => {

    it('should set token at local storage', () => {
      subject.logIn({token, user})
      expect(LocalStorageService.prototype.set).toHaveBeenCalledWith('id_token', token);
    });

    it('should set user data at local storage', () => {
      subject.logIn({user, token})
      expect(LocalStorageService.prototype.set).toHaveBeenCalledWith('user_data', user);
    });
    
  });

  it('should clear token and user data at local storage when loging out', () => {
    subject.logOut();
    expect(LocalStorageService.prototype.clear).toHaveBeenCalledWith('id_token', 'user_data');
  });

  it('should get user data from local storage', () => {
    (<jasmine.Spy>LocalStorageService.prototype.get).and.returnValue(JSON.stringify(user));
    const userData = subject.getUser();
    expect(LocalStorageService.prototype.get).toHaveBeenCalledWith('user_data');
    expect(userData).toEqual(user);
  });

});
