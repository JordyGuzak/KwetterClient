import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from './auth.service';
import { User } from '../_models/user';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(
    private http: Http,
    private authService: AuthService
    ) { }

  getAll() {
    const headers = this.authService.getHeaders();
    return this.http.get('http://localhost:3000/users/', {headers: headers})
    .map(res => res.json());
  }

}
