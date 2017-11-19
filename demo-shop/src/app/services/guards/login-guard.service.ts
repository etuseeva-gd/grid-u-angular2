import { Injectable } from '@angular/core';
import {UserService} from "../user.service";
import {Router, CanActivate} from "@angular/router";

@Injectable()
export class LoginGuardService implements CanActivate {

  constructor(private userService: UserService,
              private router: Router) {
  }

  canActivate() {
    if (!this.userService.isUserDefined()) {
      return true;
    }
    console.log('LoginGuardService - Auth user');
    this.router.navigate(['/main']);
    return false;
  }

}
