import { TestBed } from '@angular/core/testing';
import { JwtHelper } from 'angular2-jwt';

import { LogInService } from './log-in.service';
import { LocalStorageService } from './utils/local-storage.service';

const user = {name: 'name'}, token = 'tokentoken';

let subject: LogInService, isLoggedIn: jasmine.Spy;

describe('Service: LogIn', () => {
  beforeEach(() => {
    spyOn(LocalStorageService.prototype, 'set');
    spyOn(LocalStorageService.prototype, 'get').and.returnValue(JSON.stringify(user));
    spyOn(LocalStorageService.prototype, 'clear');
    spyOn(JwtHelper.prototype, 'isTokenExpired').and.returnValue(false);
    isLoggedIn = spyOn(LogInService.prototype, 'isLoggedIn');

    TestBed.configureTestingModule({
      providers: [
        JwtHelper,
        LogInService,
        LocalStorageService,
      ]
    });

    subject = TestBed.get(LogInService);
  });

  describe('when loging in', () => {

    it('should set token at local storage', () => {
      subject.logIn({token, user});
      expect(LocalStorageService.prototype.set).toHaveBeenCalledWith('id_token', token);
    });

    it('should set user data at local storage', () => {
      subject.logIn({user, token});
      expect(LocalStorageService.prototype.set).toHaveBeenCalledWith('user_data', user);
    });

    it('should update the user stream', () => {
      let userData, newUser = Object.assign({}, user, {newProp: 666});
      subject.user$.subscribe(u => userData = u);
      subject.logIn({user: newUser, token});
      expect(userData).toEqual(newUser);
    });

  });

  describe('when loging out', () => {

    it('should clear token and user data at local storage', () => {
      subject.logOut();
      expect(LocalStorageService.prototype.clear).toHaveBeenCalledWith('id_token', 'user_data');
    });

    it('should update the user stream', () => {
      let userData;
      subject.user$.subscribe(u => userData = u);
      subject.logOut();
      expect(userData).toBeNull();
    });

  });

  describe('when the user is logged in', () => {

    beforeEach(() => {
      isLoggedIn.and.returnValue(true);
    });

    it('should get user data from local storage', () => {
      const userData = subject.getUser();
      expect(LocalStorageService.prototype.get).toHaveBeenCalledWith('user_data');
      expect(userData).toEqual(user);
    });

    fit('should have an user obeserver starting with the current user data', () => {
      let userData;
      console.log(111)
      subject.user$.subscribe(u => userData = u);
      console.log(222)
      expect(userData).toEqual(user);
    });

  });

  describe('when the user is logged out', () => {

    beforeEach(() => {
      isLoggedIn.and.returnValue(false);
    });

    it('should get null when try to obtain the user data', () => {
      const userData = subject.getUser();
      expect(LocalStorageService.prototype.get).not.toHaveBeenCalledWith('user_data');
      expect(userData).toEqual(null);
    });

    it('should have an user obeserver starting with null', () => {
      let userData;
      subject.user$.subscribe(u => userData = u);
      expect(userData).toEqual(null);
    });

  });

});
