import { Component, OnInit } from '@angular/core';
import {ToastController} from "@ionic/angular";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-cupones',
  templateUrl: './cupones.page.html',
  styleUrls: ['./cupones.page.scss'],
})
export class CuponesPage implements OnInit {

  ngModel: String;
  constructor(public toastController: ToastController) { }

  ngOnInit() {
  }

  onchange(actForm: NgForm) {
    console.log(actForm.value.cupon);
  }

  enviar() {
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
