import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";
import {PATHS} from "../../constants";

@Component({
  selector: 'app-products-list-page',
  templateUrl: './products-list-page.component.html',
  styleUrls: ['./products-list-page.component.scss']
})
export class ProductsListPageComponent implements OnInit {
  private products;

  constructor(private productService: ProductService,
              private router: Router) {
  }

  ngOnInit() {
    this.products = this.productService.products;
    this.productService.loadAll();
  }

  toProductDetails(productId: number) {
    this.router.navigate([PATHS.PRODUCTS.DETAILS, productId]);
  }

  toEditMode() {
    this.router.navigate([PATHS.PRODUCTS.EDIT]);
  }

}
