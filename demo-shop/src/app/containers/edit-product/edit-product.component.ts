import {Component, Input, OnInit} from '@angular/core';
import {ICategory, IProduct} from "../../interfaces";
import {ActivatedRoute, Params} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {Product} from "../../classes";
import {CategoryService} from "../../services/category.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  product: IProduct;
  categories: Observable<ICategory[]>;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private categoryService: CategoryService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const productId = +params['productId'];
      if (productId) {
        this.productService.getProductById(productId)
          .subscribe(p => {
            this.product = p;
          }, error => console.log(error));
      } else {
        this.product = new Product();
      }

      this.categories = this.categoryService.categories;
      this.categoryService.loadAll();
    });
  }

}
