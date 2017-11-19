import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {IUser} from "../../models";
import {UserService} from "../../services/user.service";
import {PATHS} from "../../constants";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  user: IUser;

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.user = this.userService.getUser();
  }

  logout() {
    this.userService.logout().subscribe(() => {
      this.router.navigate([PATHS.LOGIN]);
    });
  }

}
