export class User {
  _id: string;
  nombre: string;
  apellidos: string;
  num_telefono: string;
  correo: string;
  pw: string;
  direcciones: string[];
  datos_tarjeta: string;
  nivel: string;
  cupones: string[];
  cupones_usado: string[]; // Array que guarda todos los cupones usados del usuario

  constructor(id = "", nombre = "", apellidos = "", num_telefono = "", correo = "", pw = "", direcciones = [], datos_tarjeta = "", nivel = "", cupones = [], cupones_usado = []) {
    this._id = id;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.num_telefono = num_telefono;
    this.correo = correo;
    this.pw = pw;
    this.direcciones = [];
    this.datos_tarjeta = datos_tarjeta;
    this.nivel = nivel;
    this.cupones = [];
    this.cupones_usado = [];
  }

}
