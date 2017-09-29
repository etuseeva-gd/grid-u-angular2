import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ErrorPagesComponent} from './error-pages/error-pages.component';
import {ProductsDetailsPageComponent} from './main/products-details-page/products-details-page.component';
import {ProductsListPageComponent} from './main/products-list-page/products-list-page.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {routing} from "./app.routing";
import {FormsModule} from "@angular/forms";
import {ErrorHandlerService} from "./services/error-handler.service";
import {MainComponent} from './main/main.component';
import {ProductService} from "./services/product.service";
import {HttpModule, JsonpModule} from "@angular/http";
import {UserService} from "./services/user.service";
import {AuthGuardService} from "./services/auth-guard.service";
import {TransportService} from "./services/transport.service";
import {StoreService} from "./services/store.service";
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import {LoginGuardService} from "./services/login-guard.service";
import {DefaultImageDirective} from "./directives/default-image.directive";
import {ProductDetailCardComponent} from "./main/components/product-detail-card/product-detail-card.component";
import {ProductListCardComponent} from "./main/components/product-list-card/product-list-card.component";
import {RatingStarsComponent} from "./main/components/rating-stars/rating-stars.component";
import {FilterComponent} from "./main/components/filter/filter.component";
import {CategoryService} from "./services/category.service";

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
    ProductDetailCardComponent,
    ProductListCardComponent,
    FilterComponent,
    RatingStarsComponent,
    DefaultImageDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    routing
  ],
  providers: [
    ErrorHandlerService,
    ProductService,
    UserService,
    AuthGuardService,
    TransportService,
    StoreService,
    LoginGuardService,
    CategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
