import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Rx";
import {ICategory} from "../../models";
import {CategoryService} from "../../services/category.service";
import {ProductService} from "../../services/product.service";

export class IPrice {
  from: number;
  to: number;
}

export class IFilterParams {
  name: string;
  isAvailable: boolean;
  gender: string;
  categoryId: number;
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
              private productsService: ProductService,
              private cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.initFilter();
    this.canSeeFilter = false;

    this.categories = this.categoryService.categories;
    this.categoryService.loadAll();
  }

  initFilter() {
    this.filterParams = {
      name: '',
      isAvailable: false,
      gender: 'Unisex',
      categoryId: null,
      rating: null,
      price: {from: null, to: null} as IPrice,
    } as IFilterParams;
    this.productsService.loadPage(1);
  }

  toggleFilter() {
    this.canSeeFilter = !this.canSeeFilter;
  }

  filter() {
    this.productsService.filterProducts(this.filterParams);
  }

  filterByName() {
    this.productsService.filterProductsByName(this.filterParams.name);
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
