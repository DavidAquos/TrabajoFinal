import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { ProductoComponent } from './components/producto/producto.component';
import { CuponComponent } from './components/cupon/cupon.component';
import { LoginComponent } from './components/login/login.component';
import { SocialComponent } from './components/social/social.component';
import { PromocionComponent } from './components/promocion/promocion.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CabeceraComponent,
    ProductoComponent,
    CuponComponent,
    LoginComponent,
    SocialComponent,
    PromocionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
