import { Component, OnInit, trigger, transition, style, animate} from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from '../../services/user.service';
import { SearchFilter } from '../../pipes/search.filter';
import { User } from '../../_models/user';
import { Kweet } from '../../_models/kweet';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  showUserSearchBar: boolean = false;
  showKweetsSearchBar: boolean = false;
  searchTextUsers: string = '';
  searchTextKweets: string = '';

  users: User[] = [];
  kweets: Kweet[] = [];

  constructor(
    private flashMessage: FlashMessagesService,
    private userService: UserService
    ) { }

  ngOnInit() {
    this.userService.getAll().subscribe(
      data => {
        if (data.success) {
          this.users = data.users;
        } else {
          console.log(data);
          //this.flashMessage.show(data.message, {cssClass: 'alert alert-danger', timeout: 3000});
        }
      }
    )
  }

}
