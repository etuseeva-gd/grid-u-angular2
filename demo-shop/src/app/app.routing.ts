import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {AuthGuardService} from "./services/auth-guard.service";
import {LoginGuardService} from "./services/login-guard.service";
import {LoginPageComponent} from "./containers/login-page/login-page.component";
import {ProductsDetailsPageComponent} from "./containers/products-details-page/products-details-page.component";
import {ProductsListPageComponent} from "./containers/products-list-page/products-list-page.component";
import {MainComponent} from "./containers/main/main.component";
import {ErrorPagesComponent} from "./modules/error-pages/error-pages.component";

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuardService],
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
        path: 'product/details/:productId',
        component: ProductsDetailsPageComponent,
        pathMatch: 'prefix'
      },
      {
        path: 'product/edit/:productId',
        component: ProductsDetailsPageComponent,
        pathMatch: 'prefix'
      }
    ]
  },
  {
    path: 'login',
    component: LoginPageComponent,
    pathMatch: 'full',
    canActivate: [LoginGuardService],
  },
  {
    path: '404',
    component: ErrorPagesComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService],
  }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
