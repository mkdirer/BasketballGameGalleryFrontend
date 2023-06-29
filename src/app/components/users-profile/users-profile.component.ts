import { TokenService } from './../../service/main_service/token.service';
import { User } from './../../models/user.model';
import { AccessRight } from './../../models/access-right.model';
import { UserService } from './../../service/main_service/user.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css']
})
export class UsersProfileComponent implements OnInit{
  @Input() viewMode: boolean = false;
  @Input() currentUser: User = {
    username: '',
    email: '',
    accessRights: [] as AccessRight[],
  };

  message = '';
  LoggedAccessRights: string[] = [];
  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getUser(this.route.snapshot.params['id']);
    }
  }

  getUser(id: string): void {
    this.userService.get(id)
      .subscribe({
        next: (data) => {
          this.currentUser = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateUser(role: string): void {
  if (this.currentUser.id) {
    // Update the accessRights array based on the selected role
    console.log(this.currentUser);
    switch (role) {
      case 'moderator':
        if (this.currentUser.accessRights && this.currentUser.accessRights[0]) {
          this.currentUser.accessRights[0].name = 'ROLE_MODERATOR';
        }
        break;
      case 'user':
        if (this.currentUser.accessRights && this.currentUser.accessRights[0]) {
          this.currentUser.accessRights[0].name = 'ROLE_USER';
        }
        break;
    }

    this.userService.update(this.currentUser.id, this.currentUser)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : "The role has been successfully changed!";
          console.log(this.currentUser);
          window.location.reload();
        },
        error: (e) => console.error(e)
      });
    }
  }

  deleteUser(): void {
    if (this.currentUser.id) {
      this.userService.delete(this.currentUser.id)
        .subscribe({
          next: (res) => {
            console.log(res);
            window.location.reload();
          },
          error: (e) => console.error(e)
        });
    }
  }
}
