import { Component, OnInit } from '@angular/core';
import {Pedido, Producto} from "../../interface/interface";
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
  pedido: Pedido = {_id: '', entrega: 1, precio_productos: [], nombre_productos: [], envio: 0, descuento_codigo: 0, metodo_pago: '', servicio: 0, total: 0 };

  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute, private alertCtrl: AlertController) {

  }

  ngOnInit() {
    const productoId = this.activatedRoute.snapshot.paramMap.get('id');
    this.dataService.getProducto(productoId).subscribe(res => {
      this.producto = res as Producto;
    });
    this.dataService.getPedido().subscribe(res => {
      this.pedido = res as Pedido;
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

        }
      },
        {
          text: 'OK',
          handler: () => {
            if (this.pedido) { // update
              this.pedido.nombre_productos.push(this.producto.nombre);
              this.pedido.precio_productos.push(this.producto.precio);
              this.dataService.putPedido(this.pedido._id, this.pedido).subscribe();

            }
            else { // Crear uno nuevo
              this.pedido = {_id: '', entrega: 0, precio_productos: [], nombre_productos: [], envio: 0, descuento_codigo: 0, metodo_pago: '', servicio: 0, total: 0 };
              this.pedido.nombre_productos.push(this.producto.nombre);
              this.pedido.precio_productos.push(this.producto.precio);
              this.dataService.postPedido(this.pedido).subscribe(res => {
                this.dataService.getPedido().subscribe(res => {
                  this.pedido = res as Pedido;
                });
              });
            }

          }
        }]
    });
    await alert.present();
  }

}
