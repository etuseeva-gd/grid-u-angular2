import {Injectable} from '@angular/core';
import {Headers} from "@angular/http";
import {TransportService} from "./transport.service";
import {IUser} from "../models";
import {StoreService} from "./store.service";
import {Observable} from "rxjs/Rx";
import {Roles} from "../constants";

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

  removeAuthSession() {
    this.removeUser();
    this.transportService.removeToken();
  }

  removeUser() {
    this.user = null;
    StoreService.remove('User');
  }

  isUserDefined(): boolean {
    return !!this.user;
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

  logout(): Observable<any> {
    const body = JSON.stringify({login: this.user.login});
    return this.transportService.post('/logout', body).map(res => {
      this.removeAuthSession();
      return true;
    });
  }

  isAdmin() {
    return this.user.roleId < Roles.User;
  }
}
