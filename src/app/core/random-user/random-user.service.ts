import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { API_URL } from '../../app.config';

@Injectable()
export class RandomUserService {

  constructor(private http: AuthHttp, @Inject(API_URL) private apiURL) { }

  get() {
    return this.http.get(`${this.apiURL}/random-user`)
      .map(r => r.json());
  }

}
