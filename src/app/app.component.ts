import 'rxjs';
import { Component } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { LogInService } from './core/log-in/log-in.service';
import { RandomUserService } from './core/random-user/random-user.service';

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

  newRandomUser$: Subject<any> = new Subject;

  randomUser$: Observable<any> = this.newRandomUser$
    .let(i => this.getRandomUser(i))
    .startWith('Get a new random user!');

  constructor(
    private logInService: LogInService,
    private randomUser: RandomUserService,
  ) {}

  login() {
    this.logInService.logIn({
      username: this.username,
      password: this.password
    })
    .catch(e => alert('login error: ' + e.toString()));
  }

  logout() {
    this.logInService.logOut();
  }

  getRandomUser(input) {
    return input.switchMap(() => this.randomUser.get()
      .retry(2)
      .startWith('Loading...')
      .catch(e => Observable.of('random user fetch error: ' + e.toString()))
    );
  }
}
