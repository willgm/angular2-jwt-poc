import { TestBed } from '@angular/core/testing';
import { JwtHelper } from 'angular2-jwt';

import { LogInService } from './log-in.service';
import { Http } from '@angular/http';
import { Subject } from 'rxjs';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { environment } from '../../app.config';
import { CoreModule } from '../core.module';

const user = {name: 'name'},
  token = 'tokentoken',
  logInUser = { username: 'username', password: 'password' };

let subject: LogInService,
  subjectLogOutSpy: jasmine.Spy,
  subjectIsLoggedInSpy: jasmine.Spy,
  localStorageGetSpy: jasmine.Spy,
  isTokenExpiredSpy: jasmine.Spy,
  http$: Subject<any>,
  httpSpy: any;

describe('Service: LogIn', () => {
  beforeEach(() => {
    spyOn(LocalStorageService.prototype, 'set');
    localStorageGetSpy = spyOn(LocalStorageService.prototype, 'get');
    spyOn(LocalStorageService.prototype, 'clear');
    isTokenExpiredSpy = spyOn(JwtHelper.prototype, 'isTokenExpired').and.returnValue(false);
    subjectIsLoggedInSpy = spyOn(LogInService.prototype, 'isLoggedIn').and.callThrough();
    subjectLogOutSpy = spyOn(LogInService.prototype, 'logOut').and.callThrough();
    http$ =  new Subject;
    httpSpy = jasmine.createSpyObj('Http', ['post']);
    (<jasmine.Spy>httpSpy.post).and.returnValue(http$);

    TestBed.configureTestingModule({
      imports: [
        CoreModule,
      ],
      providers: [
        { provide: Http, useFactory: () => httpSpy },
      ]
    });

    subject = TestBed.get(LogInService);
  });

  describe('when loging in', () => {

    let logInRequest: Promise<any>;

    beforeEach(() => {
      logInRequest = subject.logIn(logInUser);
    });

    it('should send a login request to the server', () => {
      expect(httpSpy.post).toHaveBeenCalledWith(
        `${environment.API_URL}/login`,
        jasmine.objectContaining(logInUser)
      );
    });

    describe('when the request were successful', () => {
      let newUser, currentUserData;

      beforeEach(() => {
        newUser = Object.assign({}, user, {newProp: 666});
        subject.user$.subscribe(u => currentUserData = u);
        http$.next({json: () => ({token, user: newUser})});
        http$.complete();
      });

      it('should end with the login data', () => {
        logInRequest.then(d => expect(d).toEqual({token, user: newUser}));
      });

      it('should set token at local storage', () => {
        expect(LocalStorageService.prototype.set).toHaveBeenCalledWith('id_token', token);
      });

      it('should set user data at local storage', () => {
        expect(LocalStorageService.prototype.set).toHaveBeenCalledWith('user_data', newUser);
      });

      it('should update the user stream', () => {
        expect(currentUserData).toEqual(newUser);
      });

    });

    describe('when the request has an error', () => {
      let currentUserData, error;

      beforeEach(() => {
        logInRequest.catch(e => {}); // just to avoid zone.js stacktrace
        subject.user$.subscribe(u => currentUserData = u);
        error = new Error;
        http$.error(error);
      });

      it('should bubble the error', () => {
        logInRequest.catch(e => expect(e).toBe(error));
      });

      it('should not set token at local storage', () => {
        expect(LocalStorageService.prototype.set).not.toHaveBeenCalled();
      });

      it('should not set user data at local storage', () => {
        expect(LocalStorageService.prototype.set).not.toHaveBeenCalled();
      });

      it('should not update the user stream', () => {
        expect(currentUserData).toBeNull();
      });

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
