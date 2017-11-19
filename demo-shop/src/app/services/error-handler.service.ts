import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "./user.service";
import {ErrorPagesService, IError} from "../pages/error-pages/error-pages.service";

@Injectable()
export class ErrorHandlerService {

  constructor(private userService: UserService,
              private router: Router,
              private errorPagesService: ErrorPagesService) {
  }

  errorHandler(error: any) {
    switch (error.status) {
      case 401: {
        this.userService.removeAuthSession();
        this.router.navigateByUrl('login');
        break;
      }
      case 404: {
      }
      case 500: {
        this.errorPagesService.next({
          isError: true,
          status: error.status,
        } as IError);
        break;
      }
    }
  }
}
