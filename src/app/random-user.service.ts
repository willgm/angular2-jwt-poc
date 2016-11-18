import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class RandomUserService {

  constructor(private http: AuthHttp) { }

  get() {
    return this.http.get('http://localhost:3000/random-user')
      .map(r => r.json());
  }

}
