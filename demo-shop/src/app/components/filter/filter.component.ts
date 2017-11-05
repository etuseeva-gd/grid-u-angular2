import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Rx";
import {ICategory} from "../../interfaces";
import {CategoryService} from "../../services/category.service";

export class IPrice {
  from: number;
  to: number;
}

export class IFilterParams {
  isAvailable: boolean;
  gender: string;
  category: number;
  rating: number;
  price: IPrice;
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  canSeeFilter: boolean;
  filterParams: IFilterParams;

  categories: Observable<ICategory[]>;

  constructor(private categoryService: CategoryService,
              private cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.initFilter();

    // this.canSeeFilter = false;
    this.canSeeFilter = true;

    this.categories = this.categoryService.categories;
    this.categoryService.loadAll();
  }

  initFilter() {
    this.filterParams = {
      isAvailable: false,
      gender: 'Unisex',
      category: -1,
      rating: null,
      price: {from: null, to: null} as IPrice,
    } as IFilterParams;
  }

  toggleFilter() {
    this.canSeeFilter = !this.canSeeFilter;
  }

  filter() {
    return false;
  }

  validateRating() {
    if (this.filterParams.rating < 1) {
      this.filterParams.rating = 1;
    }
    if (this.filterParams.rating > 5) {
      this.filterParams.rating = 5;
    }
    this.cdRef.detectChanges();
  }

  validatePrice() {
    if (this.filterParams.price.from < 0) {
      this.filterParams.price.from = 0
    }
    if (this.filterParams.price.to < 0) {
      this.filterParams.price.to = 0
    }
    if (this.filterParams.price.from !== null) {
      if (this.filterParams.price.to === null ||
        this.filterParams.price.to < this.filterParams.price.from) {
        this.filterParams.price.to = this.filterParams.price.from;
      }
    } else if (this.filterParams.price.to !== null) {
      this.filterParams.price.from = this.filterParams.price.to;
    }
    this.cdRef.detectChanges();
  }

}
