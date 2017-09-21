import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {ProductsDetailsPageComponent} from "./main/products-details-page/products-details-page.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {ProductsListPageComponent} from "./main/products-list-page/products-list-page.component";
import {ErrorPagesComponent} from "./error-pages/error-pages.component";
import {MainComponent} from "./main/main.component";

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'main',
    component: MainComponent,
    // canActivate: [AuthGuardService],
    children: [
      {
        redirectTo: 'products-list',
        path: '',
        pathMatch: 'full'
      },
      {
        path: 'products-list',
        component: ProductsListPageComponent,
        pathMatch: 'prefix'
      },
      {
        path: 'products',
        component: ProductsDetailsPageComponent,
        pathMatch: 'prefix'
      },
    ]
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
