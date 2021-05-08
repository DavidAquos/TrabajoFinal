import { Component, OnInit } from '@angular/core';
import {Producto, Promocion} from "../../interface/interface";
import {DataService} from "../../services/data.service";
import {ActivatedRoute} from "@angular/router";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {

  producto: Producto = {_id: '', nombre: '', precio: 0, descripcion: '', codigo: '' ,img: ''};

  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute, private alertCtrl: AlertController) { }

  ngOnInit() {
    const param = this.activatedRoute.snapshot.paramMap.get('id');
    this.dataService.getProducto(param).subscribe(res => {
      this.producto = res as Producto;
    });
  }

  async agregarCarrito() {
    const alert = await this.alertCtrl.create({
      header: 'Agregar producto',
      message: '¿Quieres agregar el producto al carrito?',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Producto cancelado');
        }
      },
        {
          text: 'OK',
          handler: () => {
            console.log('Producto agregado');
          }
        }]
    });
    await alert.present();
  }

}
