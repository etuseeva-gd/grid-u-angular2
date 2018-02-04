import {TestBed, inject, async} from '@angular/core/testing';
import {CategoryService} from '../app/services/category.service';
import {MockBackend, MockConnection} from "@angular/http/testing";
import {BaseRequestOptions, Http, ResponseOptions, Response} from "@angular/http";
import {TransportService} from "../app/services/transport.service";
import {ErrorHandlerService} from "../app/services/error-handler.service";
import {StoreService} from "../app/services/store.service";
import {UserService} from "../app/services/user.service";
import {Router} from "@angular/router";
import {ErrorPagesService} from "../app/pages/error-pages/error-pages.service";
import {Subject} from "rxjs/Subject";
import {products} from "../app/reducers/products.reducer";
import {categories} from "../app/reducers/categories.reducer";
import {StoreModule} from "@ngrx/store";

const categoriesBackEnd = [
  {
    "id": 0,
    "name": "Active wear"
  },
  {
    "id": 1,
    "name": "Jeans"
  },
  {
    "id": 2,
    "name": "Coats"
  }
];

const routerStub = {
  events: new Subject()
};

describe('Tests. CategoryService', () => {
  let service: CategoryService = null;
  let backend: MockBackend = null;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({categories, products}),
      ],
      providers: [
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (mockBackend: MockBackend, options: BaseRequestOptions) => {
            return new Http(mockBackend, options);
          },
          deps: [
            MockBackend,
            BaseRequestOptions,
          ]
        },
        StoreService,
        CategoryService,
        TransportService,
        ErrorHandlerService,
        UserService,
        {
          provide: Router,
          useValue: routerStub
        },
        ErrorPagesService
      ]
    });
  });

  beforeEach(async(inject([CategoryService, MockBackend], (categoryService: CategoryService, mockBackend: MockBackend) => {
    service = categoryService;
    backend = mockBackend;

    backend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(new Response(new ResponseOptions({body: JSON.stringify(categoriesBackEnd)})));
    });

    service.loadAll();
  })));

  it('should be created', inject([CategoryService], (service: CategoryService) => {
    expect(service).toBeTruthy();
  }));

  it('should get first category', () => {
    service.getCategoryById(0).subscribe(res => {
      expect(res).toEqual(categoriesBackEnd[0]);
    });
  });

  it('lengths should be equal', () => {
    service.categories.subscribe(res => {
      expect(res.length).toEqual(categoriesBackEnd.length);
    });
  });
});
