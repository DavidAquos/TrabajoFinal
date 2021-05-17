import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {ActivatedRoute} from "@angular/router";
import {Pedido} from "../../interface/interface";

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

  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute) {
    this.dataService.getPedido().subscribe(res => {
      this.pedido = res as Pedido;
      this.nombreProductos = this.pedido.nombre_productos;
      if (this.pedido.entrega == 0){
        this.tipoEntrega = 'Entrega en mano';
      }
      else {
        this.tipoEntrega = 'Entrega sin contacto';
      }
      console.log(this.pedido._id);
      this.dataService.deletePedido(this.pedido._id);
    });
  }

  ngOnInit() {
    setTimeout(function () {
    window.location.href = "/tabs/home";
  }, 4000);
  }

}
