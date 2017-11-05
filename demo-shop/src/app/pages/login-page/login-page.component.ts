import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {TransportService} from "../../services/transport.service";
import {PATHS} from "../../constants";
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;

  constructor(private userService: UserService,
              private transportService: TransportService,
              private router: Router) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'login': new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[a-zA-Z]*$/)
      ]),
      'password': new FormControl('', Validators.required),
    });
  }

  get login() {
    return this.loginForm.value.login;
  }

  get password() {
    return this.loginForm.value.password;
  }

  signIn() {
    const errorMessage = 'Wrong login or password';

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
                this.router.navigate([PATHS.PRODUCTS.LIST]);
              } else {
                console.log('Error with auth');
              }
            }, error => {
              //???
              this.errorMessage = error;
              console.log(error)
            });
        }
      }, error => {
        this.errorMessage = errorMessage;
        console.log(error)
      });
    return false;
  }

}
