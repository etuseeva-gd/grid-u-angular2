import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";
import {PATHS, Roles} from "../../constants";
import {IProduct, IUser} from "../../interfaces";
import {Observable} from "rxjs/Observable";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-products-list-page',
  templateUrl: './products-list-page.component.html',
  styleUrls: ['./products-list-page.component.scss']
})
export class ProductsListPageComponent implements OnInit {
  private products: Observable<IProduct[]>;
  private user: IUser;

  constructor(private productService: ProductService,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit() {
    //Todo: to redux
    this.user = this.userService.getUser();

    this.products = this.productService.products;
    this.productService.loadAll();
  }

  toProductDetails(productId: number) {
    this.router.navigate([PATHS.PRODUCTS.DETAILS, productId]);
  }

  toEditMode() {
    this.router.navigate([PATHS.PRODUCTS.EDIT]);
  }

  //Todo: rewrite
  hasAdminAccess() {
    return this.user.roleId < Roles.User;
  }
}
