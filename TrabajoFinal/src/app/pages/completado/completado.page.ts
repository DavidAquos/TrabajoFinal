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
      console.log(this.pedido);
      this.nombreProductos = this.pedido.nombre_productos;
      console.log('Nombre productos: ',this.nombreProductos);
      if (this.pedido.entrega == 1){
        this.tipoEntrega = 'Entrega en mano';
      }
      else {
        this.tipoEntrega = 'Entrega sin contacto';
      }
      console.log('Entrega: ', this.tipoEntrega);
    });
  }

  ngOnInit() {

  }

}
