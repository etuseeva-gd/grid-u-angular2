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
import {DebugElement} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {CategoryService} from "../app/services/category.service";
import {By} from "@angular/platform-browser";

export const mockServices = {
  ProductService: {
    products: new Subject(),
    loadPage: () => {},
  },
  Router: {
    events: new Subject(),
  },
  UserService: {
    isAdmin: () => true
  },
  ActivatedRoute: {
    params: new Subject()
  },
  ModalService: {
    modalAction: new Subject()
  },
  CategoryService: {
    categories: new Subject(),
    loadAll: () => {},
  }
};

const routerStub = {
  events: new Subject()
};


describe('Products-list-page component tests', () => {
  let component: ProductsListPageComponent;
  let fixture: ComponentFixture<ProductsListPageComponent>;
  let de: DebugElement;
  let el: HTMLElement;

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
        {provide: ProductService, useValue: mockServices.ProductService},
        {provide: Router, useValue: mockServices.Router},
        {provide: UserService, useValue: mockServices.UserService},
        {provide: ActivatedRoute, useValue: mockServices.ActivatedRoute},
        {provide: ModalService, useValue: mockServices.ModalService},
        {provide: CategoryService, useValue: mockServices.CategoryService},
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('button'));
    el = de.nativeElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have admin access', () => {
    expect(component.hasAdminAccess()).toBe(true);
  });

  it('button should have label and exist', () => {
    // fixture.detectChanges();
    expect(el.textContent.trim()).toBe('Add product');
  });

});
