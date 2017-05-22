import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { User } from '../_models/user';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  authToken: string;
  user: User;

  constructor(private http: Http) { }

  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
    .map(res => res.json());
  }

  login(credentials) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', credentials, {headers: headers})
    .map(res => res.json());
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  storeUserData(token: string, user: User) {
    this.authToken = token;
    this.user = user;

    localStorage.setItem('token', this.authToken);
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  loadToken() {
    const token = localStorage.getItem('token');
    if (token) this.authToken = token;
  }

  loadUser() {
    const user = localStorage.getItem('user');
    if (user) this.user = JSON.parse(user);
  }

  getHeaders() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authToken);
    return headers;
  }

  loggedIn() {
    return tokenNotExpired();
  }
}
