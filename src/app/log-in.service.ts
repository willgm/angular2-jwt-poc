import { Injectable } from '@angular/core';

import { LocalStorageService } from './utils/local-storage.service';

@Injectable()
export class LogInService {

  constructor(private storage:LocalStorageService) { }

  logIn({token, user}) {
    this.storage.set('id_token', token);
    this.storage.set('user_data', user);
  }

  logOut() {
    this.storage.clear('id_token', 'user_data');
  }

  getUser() {
    return this.storage.getObject('user_data');
  }

}
