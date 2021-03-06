import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {AppStore, IProduct} from "../models";
import "rxjs/add/operator/map";
import {TransportService} from "./transport.service";
import {Observable} from "rxjs/Observable";
import {Store} from "@ngrx/store";
import {IFilterParams} from "../components/filter/filter.component";
import {ErrorHandlerService} from "./error-handler.service";
import * as Product from '../actions/product.actions';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProductService {
  private lastPage: number;
  public products: Observable<IProduct[]>;

  constructor(private transportService: TransportService,
              private errHandler: ErrorHandlerService,
              private store: Store<AppStore>) {
    this.products = this.store.select(state => state.products);
  }

  loadPage(pageNumber: number) {
    if (pageNumber >= this.lastPage) {
      return;
    }
    this.transportService.get(`/products?_page=${pageNumber}&_limit=5`)
      .map((res: Response) => {
        const url = res.headers.getAll('link')[0].split(',');
        url.forEach(u => {
          if (u.includes('rel="last"')) {
            const startIndex = u.indexOf('='), endIndex = u.indexOf('&');
            this.lastPage = +u.substring(startIndex + 1, endIndex) || 1;
          }
        });
        return res.json() || {};
      })
      .map(payload => {
        if (pageNumber === 1) {
          return new Product.AddNew(payload);
        } else {
          return new Product.Add(payload);
        }
      })
      .subscribe(action => this.store.dispatch(action),
        error => this.errHandler.errorHandler(error));
  }

  saveProduct(product: IProduct) {
    (product.id) ? this.editProduct(product) : this.createProduct(product);
  }

  editProduct(product: IProduct) {
    this.transportService.put(`/products/${product.id}`, JSON.stringify(product))
      .subscribe(action => this.store.dispatch(new Product.Edit(product)),
        error => this.errHandler.errorHandler(error));
  }

  createProduct(product: IProduct) {
    // this.transportService.put('/products/create', JSON.stringify(product))
    //   .map(res => res.json())
    //   .map(payload => createAction(PRODUCTS.CREATE_PRODUCT, payload))
    //   .subscribe(action => this.store.dispatch(action), error => this.errHandler.errorHandler(error));

    this.store.dispatch(new Product.Create(product));
  }

  deleteProduct(product: IProduct) {
    this.transportService.delete(`/products/${product.id}`)
      .subscribe(action => this.store.dispatch(new Product.Delete(product)),
        error => this.errHandler.errorHandler(error));
  }

  filterProducts(params: IFilterParams) {
    //Todo: rewrite, add other params

    let isFirst = true;
    let url = '/products';

    if (params.gender) {
      url += `${isFirst ? '?' : '&'}gender=${params.gender}`;
      isFirst = false;
    }

    if (params.categoryId) {
      url += `${isFirst ? '?' : '&'}categoryId=${params.categoryId}`;
      isFirst = false;
    }

    if (params.rating) {
      url += `${isFirst ? '?' : '&'}rating=${params.rating}`;
      isFirst = false;
    }

    this.transportService.get(url)
      .map(res => res.json())
      .map(payload => new Product.AddNew(payload))
      .subscribe(action => this.store.dispatch(action),
        error => this.errHandler.errorHandler(error));
  }

  filterProductsByName(name: string) {
    if (name.length > 0) {
      this.transportService.get(`/products?q=${name}`)
        .map(res => res.json())
        .map(payload => new Product.AddNew(payload))
        .subscribe(action => this.store.dispatch(action),
          error => this.errHandler.errorHandler(error));
    }
  }

  getProductById(id: number | string): Observable<IProduct> {
    return this.transportService.get(`/products/${id}`)
      .map(res => res.json())
      .catch(error => {
        this.errHandler.errorHandler(error);
        return Observable.throw(error);
      });
  }

}
