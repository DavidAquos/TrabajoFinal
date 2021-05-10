import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {ActivatedRoute} from "@angular/router";
import {AlertController} from "@ionic/angular";
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
  pedido: Pedido = {
    _id: '',
    entrega: 0,
    precio_productos: [],
    nombre_productos: [],
    envio: 0,
    descuento_codigo: 0,
    metodo_pago: '',
    servicio: 0,
    total: 0
  };

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

  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute) {
    this.dataService.getPedido().subscribe(res => {
      this.pedido = res as Pedido;
      if (!this.pedido) {
        console.log('Pedido vacio')
        document.getElementById('button-pagar').classList.add('button-disabled');
      }
    });
  }

  clickButtonEnLaPuerta() {
    this.buttonPuerta = document.getElementById('button-dejar-en-la-puerta');
    this.buttonSinContacto = document.getElementById('button-sin-contacto');
    this.buttonSinContacto.classList.add('button-disabled');
    this.buttonPuerta.classList.remove('button-disabled');
    this.entrega = 1;
  }

  clickEntregaSinContacto() {
    this.buttonPuerta = document.getElementById('button-dejar-en-la-puerta');
    this.buttonSinContacto = document.getElementById('button-sin-contacto');
    this.buttonPuerta.classList.add('button-disabled');
    this.buttonSinContacto.classList.remove('button-disabled');
    this.entrega = 2;
  }

  ngOnInit() {
    this.entrega = 1;
    this.buttonPuerta = document.getElementById('button-dejar-en-la-puerta');
    this.buttonSinContacto = document.getElementById('button-sin-contacto');
    this.buttonPuerta.addEventListener('click', this.clickButtonEnLaPuerta);
    this.buttonSinContacto.addEventListener('click', this.clickEntregaSinContacto);
  }

  alClicar(variable) {
    this.datos.filter(s => s.id != variable.id && s.seleccionado).forEach(s => {
      s.seleccionado = false;
    });
    if (!(this.datos.filter(s => s.seleccionado).length > 0)) {
      document.getElementById('button-pagar').classList.add('button-disabled');
    } else {
      document.getElementById('button-pagar').classList.remove('button-disabled');
    }
  }

  pagar() {
    let pago = this.datos.find(s => s.seleccionado);
    this.dataService.deletePedido(this.pedido._id).subscribe();
    console.log('pedido borrao')
  }


}
