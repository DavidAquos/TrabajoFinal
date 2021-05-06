import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Producto} from "../models/Producto";
import {Cupon} from "../models/Cupon";
import {RedSocial} from "../models/RedSocial";
import {Promocion} from "../models/Promocion";

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  URL_API_ADMIN = 'http://localhost:3000/api/adminapp';
  URL_API_EVENT = 'http://localhost:3000/api/eventapp';

  constructor(private http: HttpClient) {
  }

  postProducto (producto: Producto){
    return this.http.post(this.URL_API_ADMIN + '/producto', producto);
  }

  putProducto (id: String, producto: Producto){
    return this.http.put(this.URL_API_ADMIN + `/producto/${id}`, producto);
  }

  postCupon (cupon: Cupon){
    return this.http.post(this.URL_API_ADMIN + '/cupon', cupon);
  }

  putCupon (id: String, cupon: Cupon){
    return this.http.put(this.URL_API_ADMIN + `/cupon/${id}`, cupon);
  }

  getProductos (){
    return this.http.get( this.URL_API_EVENT + '/producto');
  }

  getproducto(id: string) {
    return this.http.get(this.URL_API_EVENT + `/producto/${id}`);
  }

  getCupones (){
    return this.http.get( this.URL_API_EVENT + '/cupon');
  }

  getCupon (id: string){
    return this.http.get( this.URL_API_EVENT + `/cupon/${id}`);
  }

  deleteProducto (_id: string){
    return this.http.delete( this.URL_API_ADMIN + `/producto/${_id}` );
  }

  deleteCupon (_id: string){
    return this.http.delete( this.URL_API_ADMIN + `/cupon/${_id}` );
  }

  getSociales (){
    return this.http.get( this.URL_API_EVENT + '/social');
  }

  deleteSocial (_id: string){
    return this.http.delete( this.URL_API_ADMIN + `/social/${_id}` );
  }

  putSocial (id: String, social: RedSocial){
    return this.http.put(this.URL_API_ADMIN + `/social/${id}`, social);
  }

  getSocial(id: string) {
    return this.http.get(this.URL_API_EVENT + `/social/${id}`);
  }

  postSocial(social: RedSocial) {
    return this.http.post(this.URL_API_ADMIN + '/social', social);
  }

  getPromociones() {
    return this.http.get( this.URL_API_EVENT + '/promocion');
  }

  getPromocion(id: string) {
    return this.http.get(this.URL_API_EVENT + `/promocion/${id}`);
  }

  deletePromocion (_id: string){
    return this.http.delete( this.URL_API_ADMIN + `/promocion/${_id}` );
  }

  putPromocion (id: String, promocion: Promocion){
    return this.http.put(this.URL_API_ADMIN + `/promocion/${id}`, promocion);
  }

  postPromocion(promocion: Promocion) {
    return this.http.post(this.URL_API_ADMIN + '/promocion', promocion);
  }
}
