import {Injectable} from '@angular/core';
import {Headers} from "@angular/http";
import {TransportService} from "./transport.service";

@Injectable()
export class AuthService {

  constructor(private transportService: TransportService) {
  }

  login(login: string, password: string) {
    const body = JSON.stringify({login, password});
    this.transportService.post('/login', body)
      .map(res => {
        const headers: Headers = res.headers;
        this.transportService.setToken(headers.getAll('session-token')[0]);
        return res.json();
      })
      .subscribe(data => {
        console.log(data);
      }, error => console.log(error));
  }

  logout() {

  }
}

// session-token
