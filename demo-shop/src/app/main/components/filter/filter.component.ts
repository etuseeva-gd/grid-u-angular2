import {Component, OnInit} from '@angular/core';
import {ICategory} from "../../../interfaces";
import {CategoryService} from "../../../services/category.service";
import {Observable} from "rxjs/Rx";

export class FilterPrice {
  from: number;
  to: number;

  constructor() {
    this.from = 0;
    this.to = 0;
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
    this.rating = 0;
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

    this.categories = this.categoryService.categories;
    this.categoryService.loadAll();
  }

  init() {
    this.filterParams = new FilterParams();
    // this.canSeeFilter = false;
    this.canSeeFilter = true;
  }

  toggleFilter() {
    this.canSeeFilter = !this.canSeeFilter;
  }

}
