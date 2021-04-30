export class Cupon {
  _id: string;
  nombre: string;
  descuento: number;
  caducidad: string;


  constructor(id = "", nombre = "", descuento = 0, caducidad = "") {
    this._id = id;
    this.nombre = nombre;
    this.descuento = descuento;
    this.caducidad = caducidad;
  }

}
