import 'rxjs';
import { Component } from '@angular/core';
import { Http } from '@angular/http'

import { LogInService } from './log-in.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular JWT POC!';
  username = 'will';
  password = '';
  user;

  constructor(private http:Http, private logInService:LogInService){
    this.logInService.user$.subscribe(u => this.user = u);
  }

  login() {
    this.http.post('http://localhost:3000/login', {
      username: this.username,
      password: this.password
    })
    .map(r => r.json())
    .subscribe(
      data => this.logInService.logIn(data),
      error => alert(error)
    );
  }

  logout() {
    this.logInService.logOut();
  }
}
