export class Producto {
  _id: string;
  nombre: string;
  precio: number;
  descripcion: string;
  codigo: string;
  img: string;

  constructor(id = "", nombre = "", precio = 0, descripcion = "", codigo = "", img = "") {
    this._id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.descripcion = descripcion;
    this.codigo = codigo;
    this.img = img;
  }

}
