import {Component, OnInit} from '@angular/core';
import {ICategory} from "../../../interfaces";
import {CategoryService} from "../../../services/category.service";
import {Observable} from "rxjs/Rx";

export class FilterPrice {
  from: number;
  to: number;

  constructor() {
    this.from = null;
    this.to = null;
  }
}

export class FilterParams {
  isAvailable: boolean;
  gender: string; //??
  category: number;
  rating: number;
  price: FilterPrice;

  constructor() {
    this.isAvailable = false;
    this.gender = 'Unisex';
    this.category = 0;
    this.rating = null;
    this.price = new FilterPrice();
  }
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  canSeeFilter: boolean;
  filterParams: FilterParams;

  categories: Observable<ICategory[]>;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.initFilter();

    this.canSeeFilter = false;
    // this.canSeeFilter = true;

    this.categories = this.categoryService.categories;
    this.categoryService.loadAll();
  }

  initFilter() {
    this.filterParams = new FilterParams();
  }

  toggleFilter() {
    this.canSeeFilter = !this.canSeeFilter;
  }

}
