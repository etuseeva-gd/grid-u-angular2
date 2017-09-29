import {Injectable} from '@angular/core';
import {ICategory} from "../interfaces";
import {TransportService} from "./transport.service";
import {Observable, BehaviorSubject} from "rxjs/Rx";
import {Response} from '@angular/http';

@Injectable()
export class CategoryService {
  private _categories: BehaviorSubject<ICategory[]>;
  private dataStore: {
    categories: ICategory[]
  };
  constructor(private transportService: TransportService) {
    this._categories = <BehaviorSubject<ICategory[]>>new BehaviorSubject([]);
    this.dataStore = {categories: []};
  }

  get categories() {
    return this._categories.asObservable();
  }

  loadAll() {
    this.transportService.get('/categories')
      .map((res: Response) => res.json())
      .subscribe(data => {
        this.dataStore.categories = <ICategory[]> data;
        this._categories.next(Object.assign({}, this.dataStore).categories);
      }, error => console.log(error));
  }
  
}
