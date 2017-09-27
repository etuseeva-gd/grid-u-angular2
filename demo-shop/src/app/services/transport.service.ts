import {Injectable} from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import {StoreService} from "./store.service";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs/Rx";

@Injectable()
export class TransportService {
  private token: string = '';

  constructor(private http: Http) {
    if (StoreService.has('AuthToken')) {
      this.token = StoreService.get('AuthToken');
    }
  }

  setToken(token) {
    this.token = token;
    StoreService.set('AuthToken', token);
  }

  createAuthHeader(headers: Headers) {
    headers.append('session-token', this.token);
  }

  get(relativeUrl, params?): Observable<Response> {
    const headers = new Headers();
    const url = `${environment.baseUrl}${environment.prefix}${relativeUrl}`;
    if (this.token) {
      this.createAuthHeader(headers);
    }
    return this.http.get(url, {
      headers: headers,
      search: params
    });
  }

  post(relativeUrl, data, headers = new Headers({'Content-Type': 'application/json'})): Observable<Response> {
    const url = `${environment.baseUrl}${environment.prefix}${relativeUrl}`;
    if (this.token) {
      this.createAuthHeader(headers);
    }
    return this.http.post(url, data, {headers});
  }
}
