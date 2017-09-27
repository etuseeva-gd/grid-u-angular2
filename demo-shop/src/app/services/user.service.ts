import {Injectable} from '@angular/core';
import {Headers} from "@angular/http";
import {TransportService} from "./transport.service";
import {IUser} from "../interfaces";
import {StoreService} from "./store.service";
import {Observable} from "rxjs/Rx";

@Injectable()
export class UserService {
  private user: IUser = null;

  constructor(private transportService: TransportService) {
    if (StoreService.has('User')) {
      this.user = StoreService.get('User');
    }
  }

  getUser(): IUser {
    return this.user;
  }

  setUser(user: IUser): void {
    this.user = user;
    StoreService.set('User', this.user);
  }

  isUserDefined(): boolean {
    return this.user ? true : false;
  }

  login(login: string, password: string): Observable<any> {
    const body = JSON.stringify({login, password});
    return this.transportService.post('/login', body)
      .map(res => {
        const headers: Headers = res.headers;
        this.transportService.setToken(headers.getAll('session-token')[0]);
        return res;
      });
  }

  logout() {
    this.transportService.post('/logout', []);
  }
}
