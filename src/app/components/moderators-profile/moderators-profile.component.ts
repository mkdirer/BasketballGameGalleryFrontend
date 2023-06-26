import { TokenService } from './../../service/main_service/token.service';
import { User } from './../../models/user.model';
import { AccessRight } from './../../models/access-right.model';
import { UserService } from './../../service/main_service/user.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-moderators-profile',
  templateUrl: './moderators-profile.component.html',
  styleUrls: ['./moderators-profile.component.css']
})
export class ModeratorsProfileComponent implements OnInit{
  @Input() viewMode: boolean = false;
  @Input() currentUser: User = {
    username: '',
    email: '',
    accessRights: [] as AccessRight[],
  };

  message = '';
  LoggedAccessRights: string[] = [];
  // isLoggedIn = false;
  // isAdmin = false;
  // isModerator = false;
  // isUser = false;
  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      // console.log(this.isAdmin, this.isModerator, this.isUser);
      // const user = this.tokenService.getUser();
      // this.LoggedAccessRights = user.accessRights;
      // console.log(this.LoggedAccessRights);
      // this.isAdmin = this.LoggedAccessRights.includes('ROLE_ADMIN');
      // console.log(this.isAdmin);
      // this.isModerator = this.LoggedAccessRights.includes('ROLE_MODERATOR');
      // console.log(this.isModerator);
      // this.isUser = this.LoggedAccessRights.includes('ROLE_USER');
      // console.log(this.isUser);
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
    console.log(this.currentUser);
    // Update the accessRights array based on the selected role
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
          window.location.reload();
          this.message = res.message ? res.message : "The role has been successfully changed!";
          window.location.reload();
        },
        error: (e) => console.error(e)
      });
    }
  }

  // updateUser(accessRight: accessRight): void {
  //   if (this.currentUser.id) {
  //     this.userService.update(this.currentUser.id, this.currentUser)
  //       .subscribe({
  //         next: (res) => {
  //           console.log(res);
  //           this.message = res.message ? res.message : "The role has been successfully changed!";
  //           this.router.navigate(['/home']);
  //         },
  //         error: (e) => console.error(e)
  //       });
  //   }
  // }

  deleteUser(): void {
      this.userService.delete(this.currentUser.id)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.router.navigate(['/mod']);
            window.location.reload();
          },
          error: (e) => console.error(e)
        });
  }
}
