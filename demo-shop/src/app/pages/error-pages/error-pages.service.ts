import {Injectable} from '@angular/core';
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {ActivatedRoute, Router} from "@angular/router";

@Injectable()
export class ErrorPagesService {
  private _sub = new Subject();

  constructor(private router: Router) {
    // this.router.events.subscribe();
  }

  get sub(): Observable<any> {
    return this._sub.asObservable();
  }

  next(status: number) {
    // this._sub.next({status});
  }

}
