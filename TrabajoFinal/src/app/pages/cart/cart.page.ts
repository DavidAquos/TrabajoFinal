import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {Cupon, Pedido, Usuario} from "../../interface/interface";
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
  usuario: Usuario;
  usuario_cupones: any [] = [];
  desplegable: any [] = [];

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
    this.descuentoCupon = 0;
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
    });
    this.precioTotal = this.precioEnvio + this.precioPedido + this.precioServicio;

    this.desplegable.push({
      text: 'Cancelar',
      handler: () => {

      }
    });
    this.dataService.getUsuario().subscribe(res => {
      this.usuario = res as Usuario;
      this.usuario.id_cupones.forEach(c => {
        this.dataService.getCupon(c).subscribe(co => {
          let newCupon = co as Cupon;
          this.usuario_cupones.unshift(newCupon);
          this.desplegable.unshift({
            text: newCupon.nombre,
            handler: () => {
              this.seleccionarCupon(newCupon._id);
              this.buttonCodigo = document.getElementById('button-codigo');
              this.buttonCodigo.classList.add('button-codigo-usado');
            }
          });
        });
      });
    });
  }

  seleccionarCupon(id) {
    this.dataService.getCupon(id).subscribe(res => {
      this.cupon = res as Cupon;
      this.descuentoCupon = this.cupon.descuento;
      this.precioTotal = parseFloat(((this.precioEnvio + this.precioPedido + this.precioServicio) - this.descuentoCupon).toFixed(2));
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
    this.usuario.id_cupones = this.usuario.id_cupones.filter(c => c.toUpperCase() != this.cupon._id.toUpperCase());
    this.usuario.id_cupones_usado.push(this.cupon);

    this.dataService.putUsuario(this.usuario._id, this.usuario).subscribe(res => {});
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
      buttons: this.desplegable
    });
    await actionSheet.present();
  }

}
