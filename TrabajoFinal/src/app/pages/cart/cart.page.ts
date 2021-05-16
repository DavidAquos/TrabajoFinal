import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {Pedido} from "../../interface/interface";

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

  constructor(private dataService: DataService) {
    this.precioPedido = 0;
    this.precioTotal = 0;
    this.precioServicio = 2.5;
    this.precioEnvio = 3;
    this.dataService.getPedido().subscribe(res => {
      this.pedido = res as Pedido;
      if (!this.pedido) {
        document.getElementById('button-pagar').classList.add('button-disabled');
      }
      for (let i = 0; i < this.pedido.precio_productos.length; i++) {
        this.precioPedido += this.pedido.precio_productos[i];
      }
      this.precioTotal = this.precioEnvio + this.precioPedido + this.precioServicio;
    });
  }

  clickButtonEnLaPuerta() {
    this.buttonPuerta = document.getElementById('button-dejar-en-la-puerta');
    this.buttonSinContacto = document.getElementById('button-sin-contacto');
    this.buttonSinContacto.classList.add('button-disabled');
    this.buttonPuerta.classList.remove('button-disabled');
    this.entrega = 1;
    this.pedido.entrega = 1;
  }

  clickEntregaSinContacto() {
    this.buttonPuerta = document.getElementById('button-dejar-en-la-puerta');
    this.buttonSinContacto = document.getElementById('button-sin-contacto');
    this.buttonPuerta.classList.add('button-disabled');
    this.buttonSinContacto.classList.remove('button-disabled');
    this.entrega = 2;
    this.pedido.entrega = 2;
  }

  async ngOnInit() {
    this.entrega = 1;
    this.buttonPuerta = document.getElementById('button-dejar-en-la-puerta');
    this.buttonSinContacto = document.getElementById('button-sin-contacto');
    this.buttonPuerta.addEventListener('click', this.clickButtonEnLaPuerta.bind(this));
    this.buttonSinContacto.addEventListener('click', this.clickEntregaSinContacto.bind(this));
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


}
