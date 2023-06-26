import { Component } from '@angular/core';
import { TokenService } from './service/main_service/token.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private accessRights: string[] = [];
  showAdminFiller = false;
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  showUserBoard = false;
  username?: string;
  constructor(private tokenService: TokenService) { }
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenService.getUser();
      this.accessRights = user.accessRights;
      this.showUserBoard = this.accessRights.includes('ROLE_USER');
      this.showAdminBoard = this.accessRights.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.accessRights.includes('ROLE_MODERATOR');
      this.username = user.username;
    }
  }
  logout(): void {
    this.tokenService.signOut();
    window.location.reload();
  }
}
