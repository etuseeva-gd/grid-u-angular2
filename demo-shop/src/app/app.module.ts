import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {routing} from "./app.routing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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
import { EditProductComponent } from './pages/edit-product/edit-product.component';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import {ControlMessagesComponent} from "./control-messages.component";

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
    EditProductComponent,
    ControlMessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    routing,
    // StoreModule.provideStore({
    //   //place for future reducers
    // }),
    // StoreDevtoolsModule.instrumentOnlyWithExtension()
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
