import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  logged = false;
  ticketsCard: {nombre: string, precio: number, cant: number}[] = [];
  URL_API = 'http://localhost:3000/api/eventapp';

  getProductos() {
    return this.http.get(this.URL_API + '/producto');
  }

  getProducto(_id: string) {
    return this.http.get(this.URL_API + `/producto/${_id}`);
  }

  getPromociones() {
    return this.http.get(this.URL_API + '/promociones');
  }

  // tslint:disable-next-line:variable-name
  getPromocion(_id: string) {
    return this.http.get(this.URL_API + `/promocion/${_id}`);
  }

}
