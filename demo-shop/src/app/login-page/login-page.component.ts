import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {TransportService} from "../services/transport.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  login: string;
  password: string;

  constructor(private userService: UserService,
              private transportService: TransportService,
              private router: Router) {
  }

  ngOnInit() {
  }

  signIn() {
    this.userService.login(this.login, this.password)
      .subscribe(data => {
        console.log(data);
        if (!this.userService.isUserDefined()) {
          this.transportService.get('/users')
            .map(res => res.json())
            .subscribe(res => {
              console.log(res);
              const user = res.filter(r => r.login === this.login)[0];
              if (user) {
                this.userService.setUser(user);
                this.router.navigate(['/main/products-list']); //Todo: rewrite
              } else {
                console.log('Error with auth');
              }
            }, error => console.log(error));
        }
      }, error => console.log(error));
    return false;
  }

}
