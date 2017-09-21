import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ErrorPagesComponent } from './error-pages/error-pages.component';
import { ProductsDetailsPageComponent } from './products-details-page/products-details-page.component';
import { ProductsListPageComponent } from './products-list-page/products-list-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import {routing} from "./app.routing";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    ErrorPagesComponent,
    ProductsDetailsPageComponent,
    ProductsListPageComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
