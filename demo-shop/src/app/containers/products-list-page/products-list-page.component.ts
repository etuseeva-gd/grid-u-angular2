import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";

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

  showDetails(productId: number) {
    this.router.navigate(['/main/product/details', productId]);
  }

}
