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

    this.loadAll();
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

  getCategoryById(categoryId: number): ICategory {
    if (this.dataStore.categories.length > 0) {
      return this.dataStore.categories.filter(c => c.id === categoryId)[0];
    }
    return null;
  }

}