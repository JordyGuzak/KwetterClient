import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {User} from '../../_models/user';
import {AuthService} from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: User = new User('', '', '', '');

  submitted: boolean = false;

  constructor(
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  onRegister() {
    this.authService.registerUser(this.model).subscribe(
      data => {
        if (data.success) {
          this.flashMessage.show('User has been registered!', {cssClass: 'alert alert-success', timeout: 3000});
          this.router.navigate(['/login']);
        } else {
          this.flashMessage.show(data.message, {cssClass: 'alert alert-danger', timeout: 3000});
        }
      }
    );
  }
}
