import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ErrorPagesComponent } from './error-pages/error-pages.component';
import { ProductsDetailsPageComponent } from './main/products-details-page/products-details-page.component';
import { ProductsListPageComponent } from './main/products-list-page/products-list-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import {routing} from "./app.routing";
import {FormsModule} from "@angular/forms";
import {ErrorHandlerService} from "./services/error-handler.service";
import { MainComponent } from './main/main.component';
import { ProductCardComponent } from './main/product-card/product-card.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorPagesComponent,
    ProductsDetailsPageComponent,
    ProductsListPageComponent,
    LoginPageComponent,
    MainComponent,
    ProductCardComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing
  ],
  providers: [
    ErrorHandlerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
