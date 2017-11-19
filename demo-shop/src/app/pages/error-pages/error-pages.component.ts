import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {ErrorPagesService, IError} from "./error-pages.service";

@Component({
  selector: 'app-error-pages',
  templateUrl: './error-pages.component.html',
  styleUrls: ['./error-pages.component.scss']
})
export class ErrorPagesComponent implements OnInit, OnDestroy {
  private error: IError;
  private _sub: Subscription;

  constructor(private errorPagesService: ErrorPagesService) {
  }

  ngOnInit() {
    this._sub = this.errorPagesService.sub.subscribe(error => {
      this.error = error;
    });
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

}
