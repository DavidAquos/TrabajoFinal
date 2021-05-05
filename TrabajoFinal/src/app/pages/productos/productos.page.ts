import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {Producto} from "../../interface/interface";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  productos: Producto[] = [];
  titulo: string;

  constructor(private dataService: DataService, private alertCtrl: AlertController) { }

  async ngOnInit() {
    this.dataService.getProductos().subscribe(res => {
      this.productos = res as Producto[];
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
