import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {ActivatedRoute} from "@angular/router";
import {Cupon, Pedido} from "../../interface/interface";

@Component({
  selector: 'app-completado',
  templateUrl: './completado.page.html',
  styleUrls: ['./completado.page.scss'],
})
export class CompletadoPage implements OnInit {

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
  nombreProductos: string[];
  tipoEntrega: string;
  precioPedido: number;
  precioTotal: number;
  precioServicio: number;
  precioEnvio: number;
  descuentoCupon: number;
  cupon: Cupon = {
    _id: '',
    nombre: '',
    descuento: 0,
    caducidad: ''
  };

  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute) {
    this.cargarDatos();
  }

  ngOnInit() {/*
    setTimeout(function () {
    window.location.href = "/tabs/home";
  }, 4000);*/
  }

  cargarDatos() {
    this.dataService.getPedido().subscribe(res => {
      this.precioPedido = 0;
      this.precioTotal = 0;
      this.precioServicio = 2.5;
      this.precioEnvio = 3;
      this.pedido = res as Pedido;
      this.nombreProductos = this.pedido.nombre_productos;
      if (this.pedido.entrega == 0) {
        this.tipoEntrega = 'Entrega en mano';
      } else {
        this.tipoEntrega = 'Entrega sin contacto';
      }
      for (let i = 0; i < this.pedido.precio_productos.length; i++) {
        this.precioPedido += this.pedido.precio_productos[i];
      }
      // hace falta mover esto, da fallo
      this.dataService.getCupon('6092ce6661acd045345ba236').subscribe(res => {
        this.cupon = res as Cupon;
        this.descuentoCupon = this.cupon.descuento;
        this.dataService.deletePedido(this.pedido._id);
        this.precioTotal = parseFloat(((this.precioEnvio + this.precioPedido + this.precioServicio) - this.descuentoCupon).toFixed(2)); // falta poner - this.descuento.cupon
      });
    });
  }

}
