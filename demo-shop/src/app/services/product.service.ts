import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Response} from '@angular/http';
import {IProduct} from "../interfaces";
import "rxjs/add/operator/map";
import {TransportService} from "./transport.service";

@Injectable()
export class ProductService {
  private _products: BehaviorSubject<IProduct[]>;
  private dataStore: {
    products: IProduct[]
  };

  constructor(private transportService: TransportService) {
    this._products = <BehaviorSubject<IProduct[]>>new BehaviorSubject([]);
    this.dataStore = {products: []};
  }

  get products() {
    return this._products.asObservable();
  }

  loadAll() {
    this.transportService.get('/products')
      .map((res: Response) => res.json())
      .subscribe(data => {
        this.dataStore.products = <IProduct[]> data;
        this._products.next(Object.assign({}, this.dataStore).products);
      }, error => console.log(error));
  }

}
