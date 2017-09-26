import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-products-list-page',
  templateUrl: './products-list-page.component.html',
  styleUrls: ['./products-list-page.component.scss']
})
export class ProductsListPageComponent implements OnInit {
  private products;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.products = this.productService.products;
    this.productService.loadAll();
  }

}
