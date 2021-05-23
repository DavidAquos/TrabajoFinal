import { Component, OnInit } from '@angular/core';
import {ToastController} from "@ionic/angular";
import {NgForm} from "@angular/forms";
import {DataService} from "../../services/data.service";
import {Cupon, Usuario} from "../../interface/interface";

@Component({
  selector: 'app-cupones',
  templateUrl: './cupones.page.html',
  styleUrls: ['./cupones.page.scss'],
})
export class CuponesPage implements OnInit {

  ngModel: Cupon;
  usuario: Usuario;
  usuario_cupones: any [] = [];
  cupon: Cupon = {_id: '', nombre: '', descuento: 0, caducidad: ''} ;
  constructor(public toastController: ToastController, private dataService: DataService) {
    this.ngModel = {_id: '', nombre: '', descuento: 0, caducidad: ''};
  }

  ngOnInit() {
    this.dataService.getUsuario().subscribe(res => {
      this.usuario = res as Usuario;
      this.usuario.id_cupones.forEach(c => {
        this.dataService.getCupon(c).subscribe(co => {
          this.usuario_cupones.push(co as Cupon);
        })
      });
    });
  }
/*
  onchange(actForm: NgForm) {
    console.log(actForm.value.cupon);
  }*/

  enviar(actForm: NgForm) {
      this.dataService.getCuponByCode(actForm.value.cupon.toUpperCase()).subscribe(res => {
        this.cupon = res as Cupon;
      },
        error => {
          this.presentToast('Cupón inválido');
        },
        () => {
          let caducidad = new Date(parseInt(this.cupon.caducidad.split('-')[2]),
                            parseInt(this.cupon.caducidad.split('-')[1]) - 1,
                                  parseInt(this.cupon.caducidad.split('-')[0])).getTime();

          /*this.usuario.id_cupones = [];
          this.usuario.id_cupones_usado = [];
          this.dataService.putUsuario(this.usuario._id, this.usuario).subscribe(resUsuario => {
            this.presentToast('Cupón agregado correctamente!');
            console.log('Cupón recibido correctamente', this.cupon);
          });*/

          let inCupones = this.usuario.id_cupones.find(c => c == this.cupon._id);
          let inCuponesUsados = this.usuario.id_cupones_usado.find(c => c == this.cupon._id);
          if (!inCupones // no puede estar en los cupones del usuario
          && !inCuponesUsados // ni en los usados
          && caducidad > new Date().getTime()) { // ademas, la fecha de caducidad debe de ser mayor a la actual
            this.usuario.id_cupones.push(this.cupon._id);
            this.usuario_cupones.push(this.cupon);

            this.dataService.putUsuario(this.usuario._id, this.usuario).subscribe(resUsuario => {
              this.presentToast('Cupón agregado correctamente!');
              console.log('Cupón recibido correctamente', this.cupon);
            });
          }
          else {
            this.presentToast('No puedes usar este cupon!');
          }
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
