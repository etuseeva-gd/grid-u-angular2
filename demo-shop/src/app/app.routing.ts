import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {ProductsDetailsPageComponent} from "./products-details-page/products-details-page.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {ProductsListPageComponent} from "./products-list-page/products-list-page.component";
import {ErrorPagesComponent} from "./error-pages/error-pages.component";

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'main',
    pathMatch: 'prefix',
    component: ProductsDetailsPageComponent,
    // canActivate: [AuthGuardService],
  },
  {
    path: 'products',
    component: ProductsListPageComponent,
    pathMatch: 'full',
    // canActivate: [AuthGuardService],
  },
  {
    path: '404',
    component: ErrorPagesComponent,
    pathMatch: 'full',
    // canActivate: [AuthGuardService],
  },
  {
    path: 'login',
    component: LoginPageComponent,
    pathMatch: 'full',
    // canActivate: [LoginGuardService],
  }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
