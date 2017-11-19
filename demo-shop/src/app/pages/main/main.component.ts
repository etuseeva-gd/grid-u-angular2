import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {IUser} from "../../models";
import {UserService} from "../../services/user.service";
import {PATHS} from "../../constants";
import {ErrorPagesService, IError} from "../error-pages/error-pages.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  private error: IError;
  private _sub: Subscription;

  user: IUser;

  constructor(private userService: UserService,
              private router: Router,
              private errorPagesService: ErrorPagesService) {
  }

  ngOnInit() {
    this.user = this.userService.getUser();
    this._sub = this.errorPagesService.sub.subscribe(error => {
      this.error = error;
    });
  }

  logout() {
    this.userService.logout().subscribe(() => {
      this.router.navigate([PATHS.LOGIN]);
    });
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

}
