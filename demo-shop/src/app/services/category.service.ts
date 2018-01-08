import {Injectable} from '@angular/core';
import {AppStore, ICategory} from "../models";
import {TransportService} from "./transport.service";
import {Observable} from "rxjs/Rx";
import {Response} from '@angular/http';
import {ErrorHandlerService} from "./error-handler.service";
import {Store} from "@ngrx/store";
import * as Category from '../actions/category.actions'

@Injectable()
export class CategoryService {
  public categories: Observable<ICategory[]>;

  constructor(private transportService: TransportService,
              private errHandler: ErrorHandlerService,
              private store: Store<AppStore>) {
    this.categories = this.store.select(state => state.categories);
    this.loadAll();
  }

  loadAll() {
    this.transportService.get('/categories')
      .map((res: Response) => res.json() || {})
      .subscribe(payload => this.store.dispatch(new Category.Add(payload)),
        error => this.errHandler.errorHandler(error));
  }

  getCategoryById(categoryId: number): Observable<ICategory> {
    return this.categories.map((categories: ICategory[]) => categories.filter((category: ICategory) => category.id === categoryId)[0]);
  }

}
