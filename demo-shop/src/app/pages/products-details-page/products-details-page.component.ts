import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {IProduct} from "../../models";
import {PATHS} from "../../constants";
import {CategoryService} from "../../services/category.service";
import {UserService} from "../../services/user.service";
import {ModalService, IModal} from "../../components/modal/modal.service";

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
              private router: Router,
              private userService: UserService,
              private modalService: ModalService) {
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

  getCategoryById(categoryId: number) {
    return this.categoryService.getCategoryById(categoryId);
  }

  toEditMode() {
    this.router.navigate([PATHS.PRODUCTS.EDIT, this.productId]);
  }

  deleteProduct(product: IProduct) {
    this.modalService.open({
      header: 'Are you sure?',
      body: 'You are trying to delete this product. Are you sure you want this?',
      closeButton: true,
      textButton: 'Cancel',
      submitButton: true,
      onSubmit: function () {
        this.productService.deleteProduct(product);
        this.router.navigate(['/main']);
      }.bind(this)
    } as IModal);
  }

  buyProduct() {
    this.modalService.open({
      header: 'Thank you!',
      body: 'You successfully purchased this item.',
      closeButton: true,
      textButton: 'Continue shopping',
    } as IModal);
  }

  //Todo: rewrite
  hasAdminAccess() {
    return this.userService.isAdmin();
  }

}
