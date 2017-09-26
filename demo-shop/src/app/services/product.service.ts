import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {IProduct} from "../interfaces";
import "rxjs/add/operator/map";
import {BACK_URL} from "../constants";

@Injectable()
export class ProductService {
  private _products: BehaviorSubject<IProduct[]>;
  private dataStore: {
    products: IProduct[]
  };

  constructor(private http: Http) {
    this._products = <BehaviorSubject<IProduct[]>>new BehaviorSubject([]);
    this.dataStore = {products: []};
  }

  get products() {
    return this._products.asObservable();
  }

  loadAll() {
    this.http.get(`${BACK_URL}/products`)
      .map(res => res.json())
      .subscribe(data => {
        this.dataStore.products = data;
        this._products.next(Object.assign({}, this.dataStore).products);
      }, error => console.log(error));
  }

}
