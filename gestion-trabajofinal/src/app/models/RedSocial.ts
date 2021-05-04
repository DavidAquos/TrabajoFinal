export class RedSocial {
  _id: string;
  nombre: string;
  img: string;
  url: string;

  constructor(id = "", nombre = "", img = "", url = "") {
    this._id = id;
    this.nombre = nombre;
    this.img = img;
    this.url = url;
  }

}
