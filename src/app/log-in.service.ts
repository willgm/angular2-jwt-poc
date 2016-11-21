import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

import { LocalStorageService } from './utils/local-storage.service';

@Injectable()
export class LogInService {

  private userObserver$ = new Subject;

  user$: Observable<any> = this.userObserver$.merge(
    Observable.defer(() => Observable.of(this.getUser()))
  );

  constructor(
    private storage: LocalStorageService,
    private jwt: JwtHelper,
  ) {}

  logIn({token, user}) {
    this.storage.set('id_token', token);
    this.storage.set('user_data', user);
    this.userObserver$.next(user);
  }

  logOut() {
    this.storage.clear('id_token', 'user_data');
    this.userObserver$.next(null);
  }

  getUser() {
    return this.isLoggedIn() ? this.storage.getObject('user_data') : null;
  }

  getToken() {
    return this.isLoggedIn() ? this.storage.get('id_token') : null;
  }

  isLoggedIn(): boolean {
    const token = this.storage.get('id_token');
    if (!token) {
      return false;
    }

    if (this.jwt.isTokenExpired(token)) {
      this.logOut();
      return false;
    }
    return true;
  }

}
