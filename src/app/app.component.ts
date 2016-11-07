import 'rxjs';
import { Component } from '@angular/core';
import { Http } from '@angular/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular JWT POC!';
  username = 'will';
  password = '';

  constructor(private http:Http){}

  login() {
    console.log(666)
    this.http.post('http://localhost:3000/login', {
      username: this.username,
      password: this.password
    })
    .toPromise()
    .then(console.log.bind(console))
    .catch(console.log.bind(console));
  }
}
