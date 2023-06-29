import { User } from './../../models/user.model';
import { UserService } from './../../service/main_service/user.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-moderator-panel',
  templateUrl: './moderator-panel.component.html',
  styleUrls: ['./moderator-panel.component.css']
})
export class ModeratorPanelComponent implements OnInit {

  users?: User[];
  currentUser: User = {};
  currentIndex = -1;
  constructor(private userService: UserService) { }
  ngOnInit(): void {
    this.retrieveUsers();
  }
  retrieveUsers(): void {
    this.userService.getModeratorBoard()
      .subscribe({
        next: (data) => {
          this.users = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });

  }

  refreshList(): void {
    this.retrieveUsers();
    this.currentUser = {};
    this.currentIndex = -1;
  }

  setActiveUser(user: User, index: number): void {
    this.currentUser = user;
    this.currentIndex = index;
  }
}
