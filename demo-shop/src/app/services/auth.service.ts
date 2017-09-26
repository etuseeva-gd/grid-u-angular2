import {Injectable} from '@angular/core';
import {Http, Headers} from "@angular/http";
import {BACK_URL} from "../constants";

@Injectable()
export class AuthService {

  constructor(private http: Http) {
  }

  login(login: string, password: string) {
    const body = JSON.stringify({login, password});
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    this.http.post(`${BACK_URL}/login`, body, {headers})
      .map(res => {
        console.log(res);
        const headers: Headers = res.headers;
        console.log(headers);
        console.log(headers.getAll('session-token'));
      })
      .subscribe(data => {
        console.log(data);
      }, error => console.log(error));
  }
}

// session-token
