import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PATHS} from "../../constants";
import {IProduct, IUser} from "../../models";
import {UserService} from "../../services/user.service";
import {Subscription} from "rxjs/Subscription";
import {IModal, ModalService} from "../../components/modal/modal.service";

@Component({
  selector: 'app-products-list-page',
  templateUrl: './products-list-page.component.html',
  styleUrls: ['./products-list-page.component.scss']
})
export class ProductsListPageComponent implements OnInit, OnDestroy {
  private _sub: Subscription;
  private page: number;
  private products: IProduct[];
  private user: IUser;

  constructor(private productService: ProductService,
              private router: Router,
              private userService: UserService,
              private route: ActivatedRoute,
              private modalService: ModalService) {
  }

  ngOnInit() {
    this.page = 1;

    this.route.params.subscribe((params: Params) => {
        //Todo: to redux
        this.user = this.userService.getUser();
        this._sub = this.productService.products.subscribe(products => {
          this.products = products;
        });
        this.loadPage();
      }
    );
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  toProductDetails(product: IProduct) {
    this.router.navigate([PATHS.PRODUCTS.DETAILS, product.id]);
  }

  toEditMode() {
    this.router.navigate([PATHS.PRODUCTS.EDIT]);
  }

  //Todo: rewrite
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

  //Todo: rewrite
  hasAdminAccess() {
    return this.userService.isAdmin();
  }

  //Todo: maybe rewrite
  loadPage() {
    this.productService.loadPage(this.page++);
  }

  @HostListener("window:scroll", ['$event'])
  onWindowScroll() {
    let windowHeight = "innerHeight" in window ? window.innerHeight
      : document.documentElement.offsetHeight;
    let body = document.body, html = document.documentElement;
    let docHeight = Math.max(body.scrollHeight,
      body.offsetHeight, html.clientHeight,
      html.scrollHeight, html.offsetHeight);
    let windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      console.log('load');
      this.loadPage();
    }
  }

}
