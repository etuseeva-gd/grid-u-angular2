import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {Observable} from "rxjs/Rx";
import {IProduct} from "../../interfaces";

@Component({
  selector: 'app-products-details-page',
  templateUrl: './products-details-page.component.html',
  styleUrls: ['./products-details-page.component.scss']
})
export class ProductsDetailsPageComponent implements OnInit {
  private productId: number;
  private product: IProduct;

  constructor(private route: ActivatedRoute,
              private productService: ProductService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.productId = +params['productId'];
      this.productService.load(this.productId);
    });
  }

}
