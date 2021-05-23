import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Producto} from "../../../../gestion-trabajofinal/src/app/models/Producto";
import {Pedido, Usuario} from "../interface/interface";
import {Cupon} from "../../../../gestion-trabajofinal/src/app/models/Cupon";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  logged = false;
  URL_API = 'http://localhost:3000/api/eventapp';

  getProductos() {
    return this.http.get(this.URL_API + '/producto');
  }

  getProducto(_id: string) {
    return this.http.get(this.URL_API + `/producto/${_id}`);
  }

  getPromociones() {
    return this.http.get(this.URL_API + '/promocion');
  }

  getCupon(_id: string) {
    return this.http.get(this.URL_API + `/cupon/${_id}`);
  }

  getCuponByCode(code: string) {
    return this.http.get(this.URL_API + `/cuponcode/${code}`);
  }

  getCupones() {
    return this.http.get(this.URL_API + '/cupon');
  }

  // tslint:disable-next-line:variable-name
  getPromocion(_id: string) {
    return this.http.get(this.URL_API + `/promocion/${_id}`);
  }

  getSocial() {
    return this.http.get(this.URL_API + /social/);
  }

  postPedido (pedido: Pedido){
    return this.http.post(this.URL_API + '/pedido', pedido);
  }

  putPedido (id: String, pedido: Pedido){
    return this.http.put(this.URL_API + `/pedido/${id}`, pedido);
  }

  getPedido (){
    return this.http.get(this.URL_API + '/pedido');
  }

  deletePedido (_id: string){
    return this.http.delete( this.URL_API + `/pedido/${_id}` );
  }

  getUsuario (){
    return this.http.get(this.URL_API + '/usuario');
  }

  putUsuario (_id: string, usuario: Usuario){
    return this.http.put( this.URL_API + `/usuario/${_id}`, usuario);
  }
}
