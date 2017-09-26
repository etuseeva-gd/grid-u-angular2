import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  login: string;
  password: string;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  signIn() {
    this.authService.login(this.login, this.password);
  }

}
