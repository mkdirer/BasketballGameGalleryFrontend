import { TokenService } from './../../service/main_service/token.service';
import { AuthService } from './../../service/main_service/auth.service';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  accessRights: string[] = [];
  constructor(private authService: AuthService, private tokenStorage: TokenService) { }
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.accessRights = this.tokenStorage.getUser().accessRights;
    }
  }
  onSubmit(): void {
    const { username, password } = this.form;
    this.authService.login(username, password).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.accessRights = this.tokenStorage.getUser().accessRights;
        this.reloadPage();
      },
      error: err => {
        console.log(err.error.message);
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }
  reloadPage(): void {
    window.location.reload();
  }
}
