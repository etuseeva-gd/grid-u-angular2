import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {ErrorPagesService} from "./error-pages.service";

@Component({
  selector: 'app-error-pages',
  templateUrl: './error-pages.component.html',
  styleUrls: ['./error-pages.component.scss']
})
export class ErrorPagesComponent implements OnInit, OnDestroy {
  private status: string;
  private _sub: Subscription[] = [];

  constructor(private route: ActivatedRoute,
              private errorPagesService: ErrorPagesService) {
  }

  ngOnInit() {
    this._sub.push(this.errorPagesService.sub.subscribe(data => {
      this.status = data.status;
    }));

    this._sub.push(this.route.params.subscribe((params: Params) => {
      this.status = params['status'];
    }));
  }

  ngOnDestroy(): void {
    this._sub.forEach(s => {
      s.unsubscribe();
    });
  }

}
