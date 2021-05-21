import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {Cupon, Pedido} from "../../interface/interface";
import {ActionSheetController} from "@ionic/angular";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cupon: any;
  entrega: number;
  buttonPuerta: any;
  buttonSinContacto: any;
  precioPedido: number;
  pedido: Pedido;
  precioTotal: number;
  precioServicio: number;
  precioEnvio: number;
  buttonCodigo: any;
  descuentoCupon: number;
  tiempoEstimado: number;

  datos = [
    {
      id: 1,
      nombre: 'Tarjeta de crédito',
      seleccionado: true,
      color: 'primary',
      modo: 'md'
    },
    {
      id: 2,
      nombre: 'PayPal',
      seleccionado: false,
      color: 'secondary',
      modo: 'md'
    },
  ];

  constructor(private dataService: DataService, private actionSheetController: ActionSheetController) {
    this.precioPedido = 0;
    this.precioTotal = 0;
    this.precioServicio = 2.5;
    this.precioEnvio = 3;
    this.tiempoEstimado = Math.floor(Math.random() * 45) + 15;
    this.dataService.getPedido().subscribe(res => {
      this.pedido = res as Pedido;
      if (!this.pedido) {
        document.getElementById('button-pagar').classList.add('button-disabled');
      }
      for (let i = 0; i < this.pedido.precio_productos.length; i++) {
        this.precioPedido += this.pedido.precio_productos[i];
      }
      this.precioPedido = parseFloat(this.precioPedido.toFixed(2));
      this.dataService.getCupon('6092ce6661acd045345ba236').subscribe(res => {
        this.cupon = res as Cupon;
        this.descuentoCupon = this.cupon.descuento;
        this.dataService.deletePedido(this.pedido._id);
        this.precioTotal = parseFloat(((this.precioEnvio + this.precioPedido + this.precioServicio) - this.descuentoCupon).toFixed(2));
      });
    });
  }

  clickButtonEnLaPuerta() {
    this.buttonPuerta = document.getElementById('button-dejar-en-la-puerta');
    this.buttonSinContacto = document.getElementById('button-sin-contacto');
    this.buttonSinContacto.classList.add('button-disabled');
    this.buttonPuerta.classList.remove('button-disabled');
    this.entrega = 0;
    this.pedido.entrega = 0;
  }

  clickEntregaSinContacto() {
    this.buttonPuerta = document.getElementById('button-dejar-en-la-puerta');
    this.buttonSinContacto = document.getElementById('button-sin-contacto');
    this.buttonPuerta.classList.add('button-disabled');
    this.buttonSinContacto.classList.remove('button-disabled');
    this.entrega = 1;
    this.pedido.entrega = 1;
  }

  clickCodigo() {
    this.buttonCodigo = document.getElementById('button-codigo');
    this.presentActionSheet();
  }

  async ngOnInit() {
    this.entrega = 0;
    this.buttonPuerta = document.getElementById('button-dejar-en-la-puerta');
    this.buttonSinContacto = document.getElementById('button-sin-contacto');
    this.buttonCodigo = document.getElementById('button-codigo');
    this.buttonPuerta.addEventListener('click', this.clickButtonEnLaPuerta.bind(this));
    this.buttonSinContacto.addEventListener('click', this.clickEntregaSinContacto.bind(this));
    this.buttonCodigo.addEventListener('click', this.clickCodigo.bind(this));
  }

  alClicar(variable) {
    this.datos.filter(s => s.id != variable.id && s.seleccionado).forEach(s => {
      s.seleccionado = false;
    });

    if (!(this.datos.filter(s => s.seleccionado).length > 0) || !this.pedido) {
      document.getElementById('button-pagar').classList.add('button-disabled');
      document.getElementById('button-pagar').classList.add('button-noevents');
    }
    else {
      document.getElementById('button-pagar').classList.remove('button-disabled');
      document.getElementById('button-pagar').classList.remove('button-noevents');
    }
  }

  pagar() {
    let pago = this.datos.find(s => s.seleccionado);
    this.dataService.putPedido(this.pedido._id,this.pedido).subscribe(res => {
      this.dataService.getPedido().subscribe(res => {
        this.pedido = res as Pedido;
      });
    });
  }


  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Cupones',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Delete',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Share',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Play (open modal)',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Favorite',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cerrar',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
