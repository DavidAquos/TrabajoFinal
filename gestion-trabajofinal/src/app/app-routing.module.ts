import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {ProductoComponent} from "./components/producto/producto.component";
import {CuponComponent} from "./components/cupon/cupon.component";
import {LoginComponent} from "./components/login/login.component";

const routes: Routes = [
  {
  path: '',
  redirectTo: '/home',
  pathMatch: 'full'
  }
  ,
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'producto',
    component: ProductoComponent
  },
  {
    path: 'producto/:id',
    component: ProductoComponent
  },
  {
    path: 'cupon/:id',
    component: CuponComponent
  },
  {
    path: 'cupon',
    component: CuponComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
