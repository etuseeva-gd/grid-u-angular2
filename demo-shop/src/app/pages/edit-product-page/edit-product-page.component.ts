import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ICategory, IProduct} from "../../models";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {CategoryService} from "../../services/category.service";
import {Observable} from "rxjs/Observable";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IModal, ModalService} from "../../components/modal/modal.service";

// export const FORM_TYPE = {}

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product-page.component.html',
  styleUrls: ['./edit-product-page.component.scss']
})
export class EditProductPageComponent implements OnInit {
  editForm: FormGroup;
  product: IProduct;
  categories: Observable<ICategory[]>;
  type: string;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private categoryService: CategoryService,
              private router: Router,
              private cdRef: ChangeDetectorRef,
              private modalService: ModalService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const productId = +params['productId'];
      if (productId > -1) {
        this.productService.getProductById(productId)
          .subscribe(product => {
            this.product = product;
            this.initForm();
          }, error => console.log(error));
      } else {
        this.product = {
          id: this.getRandomInt(100, 150),
          categoryId: null,
          image: null,
          name: null,
          description: null,
          cost: null,
          rating: null,
          gender: null,
          count: null,
          soldCount: null,
        } as IProduct;
        this.initForm();
      }
      this.categories = this.categoryService.categories;
      this.categoryService.loadAll();
    });
  }

  initForm() {
    this.editForm = new FormGroup({
      'name': new FormControl(this.product.name, [Validators.required]),
      'categoryId': new FormControl(this.product.categoryId, [Validators.required]),
      'image': new FormControl(this.product.image, [Validators.required]),
      'description': new FormControl(this.product.description, [Validators.required]),
      'cost': new FormControl(this.product.cost,
        [
          Validators.required,
          Validators.min(0)
        ]),
      'rating': new FormControl(this.product.rating, [Validators.required]),
      'gender': new FormControl(this.product.gender, [Validators.required]),
    });
  }

  action() {
    this.editForm.value.name = this.editForm.value.name.trim();
    this.editForm.value.description = this.editForm.value.description.trim();

    this.modalService.open({
      header: 'Are you sure?',
      body: 'You are trying to edit this product. Are you sure you want this?',
      closeButton: true,
      textButton: 'Cancel',
      submitButton: true,
      onSubmit: function () {
        this.productService.saveProduct(this.editForm.value);
        this.router.navigate(['/main']);
      }.bind(this)
    } as IModal);

    return false;
  }

  validateCost() {
    if (this.product.cost < 0) {
      this.product.cost = 0;
    }
    this.cdRef.detectChanges();
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  get genders() {
    return ['Man', 'Woman', 'Unisex'];
  }

}
