export class Promocion {
  _id: string;
  nombre: string;
  descripcion: string;
  img: string;

  constructor(id = "", nombre = "", descripcion = "", img = "") {
    this._id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.img = img;
  }

}
