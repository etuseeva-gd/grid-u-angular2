import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {routing} from "./app.routing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ErrorHandlerService} from "./services/error-handler.service";
import {ProductService} from "./services/product.service";
import {HttpModule, JsonpModule} from "@angular/http";
import {UserService} from "./services/user.service";
import {TransportService} from "./services/transport.service";
import {StoreService} from "./services/store.service";
import {LoginGuardService} from "./services/guards/login-guard.service";
import {DefaultImageDirective} from "./directives/default-image.directive";
import {CategoryService} from "./services/category.service";
import {ErrorPagesComponent} from "./pages/error-pages/error-pages.component";
import {MainComponent} from "./pages/main/main.component";
import {ProductListCardComponent} from "./components/product-card/product-card.component";
import {RatingStarsComponent} from "./components/rating-stars/rating-stars.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {HeaderComponent} from "./components/header/header.component";
import {FilterComponent} from "./components/filter/filter.component";
import {FooterComponent} from "./components/footer/footer.component";
import {ProductsDetailsPageComponent} from "./pages/products-details-page/products-details-page.component";
import {ProductsListPageComponent} from "./pages/products-list-page/products-list-page.component";
import {EditProductPageComponent} from './pages/edit-product-page/edit-product-page.component';
import {StoreModule} from '@ngrx/store';
import {ControlMessagesComponent} from "./components/control-messages.component";
import {AccessGuardService} from "./services/guards/access-guard.service";
import {products} from "./reducers/products.reducer";
import {ModalComponent} from './components/modal/modal.component';
import {ModalService} from "./components/modal/modal.service";
import {ErrorPagesService} from "./pages/error-pages/error-pages.service";
import {AuthGuardService} from "./services/guards/auth-guard.service";
import {categories} from "./reducers/categories.reducer";

@NgModule({
  declarations: [
    AppComponent,
    ErrorPagesComponent,
    ProductsDetailsPageComponent,
    ProductsListPageComponent,
    LoginPageComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    ProductListCardComponent,
    FilterComponent,
    RatingStarsComponent,
    DefaultImageDirective,
    ControlMessagesComponent,
    ModalComponent,
    EditProductPageComponent,
    ControlMessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    routing,
    StoreModule.forRoot({categories, products}),
  ],
  providers: [
    UserService,
    ErrorHandlerService,
    ProductService,
    UserService,
    AuthGuardService,
    TransportService,
    StoreService,
    LoginGuardService,
    CategoryService,
    AccessGuardService,
    ModalService,
    ErrorPagesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
