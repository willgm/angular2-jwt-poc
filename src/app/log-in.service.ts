import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import { LocalStorageService } from './utils/local-storage.service';

@Injectable()
export class LogInService {

  user$: Observable<any>;

  private userObserver;

  constructor(private storage: LocalStorageService) {
    this.userObserver = new Subject;
    this.user$ = Observable.from(this.userObserver)
      .startWith(this.getUser());
  }

  logIn({token, user}) {
    this.storage.set('id_token', token);
    this.storage.set('user_data', user);
    this.userObserver.next(user);
  }

  logOut() {
    this.storage.clear('id_token', 'user_data');
    this.userObserver.next(null);
  }

  getUser() {
    return this.storage.getObject('user_data');
  }

}
