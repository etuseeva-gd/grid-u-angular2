import {Injectable, OnDestroy} from '@angular/core';
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Subscription} from "rxjs/Subscription";

export interface IError {
  status?: number;
  text?: string;
  isError: boolean;
}

@Injectable()
export class ErrorPagesService implements OnDestroy {
  private subject: BehaviorSubject<IError>;
  private subscription: Subscription;

  constructor(private router: Router) {
    this.subject = new BehaviorSubject({isError: false});
    this.subscription = this.router.events.filter(e => e instanceof NavigationEnd)
      .subscribe(() => {
        this.next({isError: false} as IError);
      });
  }

  get sub(): Observable<any> {
    return this.subject.asObservable();
  }

  next(error: IError) {
    this.subject.next(error);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
