import 'rxjs';
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import { LogInService } from './log-in.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular JWT POC!';
  username = 'will';
  password = '';
  user$: Observable<any>;

  randomUser$;

  constructor(private http: Http, private authHttp: AuthHttp, private logInService: LogInService) {
    this.user$ = this.logInService.user$;
  }

  login() {
    this.http.post('http://localhost:3000/login', {
      username: this.username,
      password: this.password
    })
    .do(() => this.randomUser$ = null)
    .map(r => r.json())
    .subscribe(
      data => this.logInService.logIn(data),
      error => alert('login error: ' + error.toString())
    );
  }

  logout() {
    this.logInService.logOut();
  }

  getRandomUser() {
    this.randomUser$ = this.authHttp.get('http://localhost:3000/random-user')
      .map(r => r.json())
      .startWith('Loading...')
      .catch(error => {
        alert('random user error: ' + error.toString());
        return Observable.of(null);
      });
  }
}
