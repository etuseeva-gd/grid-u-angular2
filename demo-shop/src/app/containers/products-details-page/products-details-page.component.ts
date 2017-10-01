import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {Observable} from "rxjs/Rx";
import {IProduct} from "../../interfaces";
import {NOT_FOUND_IMAGE} from "../../constants";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-products-details-page',
  templateUrl: './products-details-page.component.html',
  styleUrls: ['./products-details-page.component.scss']
})
export class ProductsDetailsPageComponent implements OnInit {
  private productId: number;
  private product: IProduct;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private categoryService: CategoryService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.productId = +params['productId'];
      this.productService.getProductById(this.productId)
        .subscribe(p => {
          this.product = p;
        }, error => console.log(error));
    });
  }

  getNotFoundImage() {
    return NOT_FOUND_IMAGE;
  }

  getCategoryNameById(categoryId: number) {
    return this.categoryService.getCategoryById(categoryId).name;
  }

  toEditMode(productId: number) {
    this.router.navigate(['/main/product/edit', this.productId]);
  }

  deleteProduct() {

  }

}
