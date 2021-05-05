import { Component, OnInit } from '@angular/core';
import {EventoService} from "../../services/evento.service";
import {Producto} from "../../models/Producto";
import {Cupon} from "../../models/Cupon";
import {RedSocial} from "../../models/RedSocial";

declare const M: any;
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/djlgdcqhg/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'rdzzccwc';
let progressbar: any = null;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productos: Producto[] = [];
  cupones: Cupon[] = [];
  redSocial: RedSocial[] = [];
  img: String | ArrayBuffer = 'assets/img-not-found.png';
  alertBody = '';
  idToEliminate: string;
  act0tal1 = 0;
  alertHead: string;
  alertbody: string;

  constructor(private eventoService: EventoService) { }

  ngOnInit(): void {
    progressbar = document.getElementById('img-upload-bar');
    M.AutoInit();
    this.eventoService.getProductos().subscribe(res => {
      this.productos = res as Producto[];
    });
    this.eventoService.getCupones().subscribe(res => {
      this.cupones = res as Cupon[];
    });
    this.eventoService.getSociales().subscribe(res => {
      this.redSocial = res as RedSocial[];
    });
  }

  confirmdelete(_id: string, nombre: string, table: number) {
    this.idToEliminate = _id;
    this.act0tal1 = table;
    this.alertHead = 'Eliminar "' + nombre + '" ?';
    if (table)
      this.alertbody = 'Estas seguro de eliminar "' + nombre + '" de forma permanente?';
    else
      this.alertbody = 'Estas seguro de eliminar el producto "' + nombre + '" de forma permanente?';
    var elems = document.getElementById('modal1');
    var instances = M.Modal.init(elems);
    instances.open();
  }

  onSelectFile($event: Event) {

  }

  guardarCambios() {

  }

  delete() {
    if (this.act0tal1 == 1) {
      this.eventoService.deleteProducto(this.idToEliminate).subscribe(res => {
        const resaux = res as { message: string };
        M.toast({html: resaux.message, classes: 'rounded'});
        for (let i = 0; i < this.productos.length; i++) {
          if (this.productos[i]._id == this.idToEliminate) {
            this.productos.splice(i, 1);
          }
        }
      });
    } else if (this.act0tal1 == 2) {
      this.eventoService.deleteCupon(this.idToEliminate).subscribe(res => {
        const resaux = res as { message: string };
        M.toast({html: resaux.message, classes: 'rounded'});
        for (let i = 0; i < this.cupones.length; i++) {
          if (this.cupones[i]._id == this.idToEliminate) {
            this.cupones.splice(i, 1);
          }
        }
      });
    }
    else {
      this.eventoService.deleteSocial(this.idToEliminate).subscribe(res => {
        const resaux = res as { message: string };
        M.toast({html: resaux.message, classes: 'rounded'});
        for (let i = 0; i < this.redSocial.length; i++) {
          if (this.redSocial[i]._id == this.idToEliminate) {
            this.redSocial.splice(i, 1);
          }
        }
      });
    }
  }
}
