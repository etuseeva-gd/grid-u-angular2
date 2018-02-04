import {ComponentFixture, TestBed} from "@angular/core/testing";
import {ProductsListPageComponent} from "../app/pages/products-list-page/products-list-page.component";
import {ProductService} from "../app/services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../app/services/user.service";
import {ModalService} from "../app/components/modal/modal.service";
import {FilterComponent} from "../app/components/filter/filter.component";
import {ProductCardComponent} from "../app/components/product-card/product-card.component";
import {FormsModule} from "@angular/forms";
import {RatingStarsComponent} from "../app/components/rating-stars/rating-stars.component";
import {By} from "@angular/platform-browser";

export const mockServices = {
  ProductService: {},
  Router: {},
  UserService: {},
  ActivatedRoute: {},
  ModalService: {}
};

describe('Products-list-page component tests', () => {
  let comp: ProductsListPageComponent;
  let fixture: ComponentFixture<ProductsListPageComponent>;
  // let de: DebugElement;
  // let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        ProductsListPageComponent,
        FilterComponent,
        ProductCardComponent,
        RatingStarsComponent
      ],
      providers: [
        {provide: ProductService, useClass: mockServices.ProductService},
        {provide: Router, useClass: mockServices.Router},
        {provide: UserService, useClass: mockServices.UserService},
        {provide: ActivatedRoute, useClass: mockServices.ActivatedRoute},
        {provide: ModalService, useClass: mockServices.ModalService},
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ProductsListPageComponent);
      comp = fixture.componentInstance;
    });
  });

  it('true is true', () => expect(true).toBe(true));
});
