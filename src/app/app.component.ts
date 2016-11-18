import 'rxjs';
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import { LogInService } from './log-in.service';
import { Observable, Subject } from 'rxjs';
import { RandomUserService } from './random-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular JWT POC!';
  username = 'will';
  password = '';
  user$: Observable<any> = this.logInService.user$;

  newRandomUser: Subject<any> = new Subject;

  randomUser$: Observable<any> = this.newRandomUser
    .let(i => this.getRandomUser(i))
    .startWith('Get a new random user!');

  constructor(
    private http: Http,
    private authHttp: AuthHttp,
    private logInService: LogInService,
    private randomUser: RandomUserService
  ) {}

  login() {
    this.http.post('http://localhost:3000/login', {
      username: this.username,
      password: this.password
    })
    .map(r => r.json())
    .subscribe(
      data => this.logInService.logIn(data),
      error => alert('login error: ' + error.toString())
    );
  }

  logout() {
    this.logInService.logOut();
  }

  getRandomUser(input) {
    return input.switchMap(() => this.randomUser.get()
      .startWith('Loading...')
      .catch(error => {
        alert('get random user error: ' + error.toString());
        return Observable.of(null);
      })
    );
  }
}
