import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {routing} from "./app.routing";
import {FormsModule} from "@angular/forms";
import {ErrorHandlerService} from "./services/error-handler.service";
import {ProductService} from "./services/product.service";
import {HttpModule, JsonpModule} from "@angular/http";
import {UserService} from "./services/user.service";
import {AuthGuardService} from "./services/auth-guard.service";
import {TransportService} from "./services/transport.service";
import {StoreService} from "./services/store.service";
import {LoginGuardService} from "./services/login-guard.service";
import {DefaultImageDirective} from "./directives/default-image.directive";
import {CategoryService} from "./services/category.service";
import {ErrorPagesComponent} from "./modules/error-pages/error-pages.component";
import {MainComponent} from "./containers/main/main.component";
import {ProductListCardComponent} from "./modules/product-card/product-card.component";
import {RatingStarsComponent} from "./modules/rating-stars/rating-stars.component";
import {LoginPageComponent} from "./containers/login-page/login-page.component";
import {HeaderComponent} from "./modules/header/header.component";
import {FilterComponent} from "./containers/filter/filter.component";
import {FooterComponent} from "./modules/footer/footer.component";
import {ProductsDetailsPageComponent} from "./containers/products-details-page/products-details-page.component";
import {ProductsListPageComponent} from "./containers/products-list-page/products-list-page.component";
import { EditProductComponent } from './containers/edit-product/edit-product.component';

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
    EditProductComponent
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
