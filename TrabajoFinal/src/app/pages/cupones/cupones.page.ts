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
  cupon: Cupon = {_id: '', nombre: '', descuento: 0, caducidad: ''};
  constructor(public toastController: ToastController, private dataService: DataService) {
    this.ngModel = new Cupon();
  }

  ngOnInit() {
  }
/*
  onchange(actForm: NgForm) {
    console.log(actForm.value.cupon);
  }*/

  enviar(actForm: NgForm) {
    console.log(actForm.value.nombre);
    this.dataService.getCuponByCode(actForm.value.cupon).subscribe(res => {
      this.cupon = res as Cupon;
      console.log('Cupón recibido correctamente',this.cupon);

    });
    this.presentToast();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Cupón añadido!',
      duration: 2000
    });
    await toast.present();
  }
}
