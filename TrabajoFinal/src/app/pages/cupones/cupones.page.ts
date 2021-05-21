import { Component, OnInit } from '@angular/core';
import {ToastController} from "@ionic/angular";
import {NgForm} from "@angular/forms";
import {DataService} from "../../services/data.service";
import {Cupon} from "../../interface/interface";
import {Producto} from "../../../../../gestion-trabajofinal/src/app/models/Producto";

@Component({
  selector: 'app-cupones',
  templateUrl: './cupones.page.html',
  styleUrls: ['./cupones.page.scss'],
})
export class CuponesPage implements OnInit {

  ngModel: Cupon;
  cupon: Cupon = {_id: '', nombre: '', descuento: 0, caducidad: ''} ;
  constructor(public toastController: ToastController, private dataService: DataService) {
    this.ngModel = {_id: '', nombre: '', descuento: 0, caducidad: ''};
  }

  ngOnInit() {
  }
/*
  onchange(actForm: NgForm) {
    console.log(actForm.value.cupon);
  }*/

  enviar(actForm: NgForm) {
      this.dataService.getCuponByCode(actForm.value.cupon).subscribe(res => {
        this.cupon = res as Cupon;
      },
        error => {
          this.presentToast('Cupón inválido');
        },
        () => {
          this.presentToast('Cupón agregado correctamente!');
          console.log('Cupón recibido correctamente', this.cupon);
        });
    }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    await toast.present();
  }
}
