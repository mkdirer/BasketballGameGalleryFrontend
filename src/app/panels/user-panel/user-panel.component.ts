import { User } from './../../models/user.model';
import { UserService } from './../../service/main_service/user.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {

  users?: User[];
  currentUser: User = {};
  currentIndex = -1;
  constructor(private userService: UserService) { }
  ngOnInit(): void {
    this.retrieveUsers();
  }
  retrieveUsers(): void {
    this.userService.getUserBoard()
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
  // removeAllUsers(): void {
  //   this.userService.deleteAll()
  //     .subscribe({
  //       next: (res) => {
  //         console.log(res);
  //         this.refreshList();
  //       },
  //       error: (e) => console.error(e)
  //     });
  // }
  // searchname(): void {
  //   this.currentUser = {};
  //   this.currentIndex = -1;
  //   this.userService.findByName(this.name, "user")
  //     .subscribe({
  //       next: (data) => {
  //         this.users = data;
  //         console.log(data);
  //       },
  //       error: (e) => console.error(e)
  //     });
  // }

}

