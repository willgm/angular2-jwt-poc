import { TestBed } from '@angular/core/testing';
import { JwtHelper } from 'angular2-jwt';

import { LogInService } from './log-in.service';
import { LocalStorageService } from './utils/local-storage.service';

const user = {name: 'name'}, token = 'tokentoken';

let subject: LogInService,
  subjectLogOutSpy: jasmine.Spy,
  subjectIsLoggedInSpy: jasmine.Spy,
  localStorageGetSpy: jasmine.Spy,
  isTokenExpiredSpy: jasmine.Spy;

describe('Service: LogIn', () => {
  beforeEach(() => {
    spyOn(LocalStorageService.prototype, 'set');
    localStorageGetSpy = spyOn(LocalStorageService.prototype, 'get');
    spyOn(LocalStorageService.prototype, 'clear');
    isTokenExpiredSpy = spyOn(JwtHelper.prototype, 'isTokenExpired').and.returnValue(false);
    subjectIsLoggedInSpy = spyOn(LogInService.prototype, 'isLoggedIn').and.callThrough();
    subjectLogOutSpy = spyOn(LogInService.prototype, 'logOut').and.callThrough();

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
      localStorageGetSpy.and.returnValue(JSON.stringify(user));
      subjectIsLoggedInSpy.and.returnValue(true);
    });

    it('should get user data from local storage', () => {
      const userData = subject.getUser();
      expect(LocalStorageService.prototype.get).toHaveBeenCalledWith('user_data');
      expect(userData).toEqual(user);
    });

    it('should have an user obeserver starting with the current user data', () => {
      let userData;
      subject.user$.subscribe(u => userData = u);
      expect(userData).toEqual(user);
    });

    it('should get the token from local storage', () => {
      localStorageGetSpy.and.returnValue(token);
      const myToken = subject.getToken();
      expect(LocalStorageService.prototype.get).toHaveBeenCalledWith('id_token');
      expect(myToken).toEqual(token);
    });

  });

  describe('when the user is logged out', () => {

    beforeEach(() => {
      subjectIsLoggedInSpy.and.returnValue(false);
    });

    it('should get null when try to obtain the user data', () => {
      const userData = subject.getUser();
      expect(LocalStorageService.prototype.get).not.toHaveBeenCalledWith('user_data');
      expect(userData).toBeNull();
    });

    it('should have an user obeserver starting with null', () => {
      let userData;
      subject.user$.subscribe(u => userData = u);
      expect(userData).toBeNull();
    });

    it('should get a null when try to obten the token', () => {
      const myToken = subject.getToken();
      expect(LocalStorageService.prototype.get).not.toHaveBeenCalledWith('id_token');
      expect(myToken).toBeNull();
    });

  });

  describe('when verifing if the user is logged in', () => {

    beforeEach(() => {
      subjectIsLoggedInSpy.and.callThrough();
    });

    it('should return false when there is no token', () => {
      localStorageGetSpy.and.returnValue(null);
      expect(subject.isLoggedIn()).toBe(false);
    });

    it('should return false when there is an expired token', () => {
      localStorageGetSpy.and.returnValue(token);
      isTokenExpiredSpy.and.returnValue(true);
      expect(subject.isLoggedIn()).toBe(false);
    });

    it('should logout when there is an expired token', () => {
      localStorageGetSpy.and.returnValue(token);
      isTokenExpiredSpy.and.returnValue(true);
      subject.isLoggedIn();
      expect(subjectLogOutSpy).toHaveBeenCalled();
    });

    it('should return true when there is a valid token', () => {
      localStorageGetSpy.and.returnValue(token);
      expect(subject.isLoggedIn()).toBe(true);
    });

  });

});
