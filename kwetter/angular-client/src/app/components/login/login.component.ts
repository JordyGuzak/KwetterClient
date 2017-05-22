import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {User} from '../../_models/user';
import {AuthService} from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: User = new User('', '', '', '');

  constructor(
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLogin() {
    const credentials = {
      username: this.model.username,
      password: this.model.password
    };

    this.authService.login(credentials).subscribe(
      data => {
        if (data.success) {
          const user: User = data.user;
          const token = data.token;
          //Store user data
          this.authService.storeUserData(token, user);
          this.flashMessage.show('You are logged in', {cssClass: 'alert alert-success', timeout: 2000});
          this.router.navigate(['/profile']);
        } else {
          this.flashMessage.show(data.message, {cssClass: 'alert alert-danger', timeout: 3000});
        }
      }
    );
  }

}
