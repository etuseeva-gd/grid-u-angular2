import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {AuthGuardService} from "./services/guards/auth-guard.service";
import {LoginGuardService} from "./services/guards/login-guard.service";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {ProductsDetailsPageComponent} from "./pages/products-details-page/products-details-page.component";
import {ProductsListPageComponent} from "./pages/products-list-page/products-list-page.component";
import {MainComponent} from "./pages/main/main.component";
import {ErrorPagesComponent} from "./pages/error-pages/error-pages.component";
import {EditProductPageComponent} from "./pages/edit-product-page/edit-product-page.component";
import {AccessGuardService} from "./services/guards/access-guard.service";

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
        component: EditProductPageComponent,
        pathMatch: 'prefix',
        canActivate: [AccessGuardService]
      },
      {
        path: 'product/edit',
        component: EditProductPageComponent,
        pathMatch: 'prefix',
        canActivate: [AccessGuardService]
      }
    ]
  },
  {
    path: 'login',
    component: LoginPageComponent,
    pathMatch: 'full',
    canActivate: [LoginGuardService],
  },
  // {
  //   path: 'error/:status',
  //   component: ErrorPagesComponent,
  //   pathMatch: 'full',
  //   canActivate: [AuthGuardService],
  // },
  // {
  //   path: '**',
  //   redirectTo: '/error/404'
  // }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
