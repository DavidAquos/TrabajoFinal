import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {Usuario} from "../../interface/interface";
import {NgForm} from "@angular/forms";
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.page.html',
  styleUrls: ['./tarjeta.page.scss'],
})
export class TarjetaPage implements OnInit {

  cvv: string;
  bin: string;
  caducidad: string;

  usuario: Usuario = {
    _id: '',
    nombre: '',
    pw: '',
    correo: '',
    num_telefono: 0,
    nivel: '',
    direcciones: [],
    apellidos: '',
    datos_tarjeta: '',
    id_cupones_usado: [],
    id_cupones: []
  };

  ngModel: Usuario;

  constructor(public toastController: ToastController ,private dataService: DataService) {
    this.ngModel = {
      _id: '',
      nombre: '',
      pw: '',
      correo: '',
      num_telefono: 0,
      nivel: '',
      direcciones: [],
      apellidos: '',
      datos_tarjeta: '',
      id_cupones_usado: [],
      id_cupones: []
    };
  }

  ngOnInit() {
    this.dataService.getUsuario().subscribe(res => {
      this.usuario = res as Usuario;
      this.bin = this.usuario.datos_tarjeta.split('|')[0];
      this.caducidad = this.usuario.datos_tarjeta.split('|')[1];
      this.cvv = this.usuario.datos_tarjeta.split('|')[2];
    });
  }

  formatFecha() {
    if (this.caducidad.indexOf('/') == -1 && this.caducidad.length > 1) {
      this.caducidad += '/';
    }
  }

  mandarTarjeta(actForm: NgForm) {
    this.usuario.datos_tarjeta = this.bin + '|' + this.caducidad + '|' + this.cvv;
    this.dataService.putUsuario(this.usuario._id, this.usuario).subscribe();
    this.presentToast('Tarjeta guardada correctamente!');
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    await toast.present();
  }
}
