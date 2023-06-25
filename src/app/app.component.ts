import { Component } from '@angular/core';
import { TokenService } from './service/main_service/token.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private accessRights: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  constructor(private tokenService: TokenService) { }
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenService.getUser();
      this.accessRights = user.accessRights;
      this.showAdminBoard = this.accessRights.includes('ADMIN_ACCESS_RIGHT');
      this.showModeratorBoard = this.accessRights.includes('MODERATOR_ACCESS_RIGHT');
      this.username = user.username;
    }
  }
  logout(): void {
    this.tokenService.signOut();
    window.location.reload();
  }
}
