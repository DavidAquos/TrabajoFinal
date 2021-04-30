import { Component, OnInit } from '@angular/core';
import {Cupon} from "../../models/Cupon";
import {EventoService} from "../../services/evento.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";

declare const M: any;
let progressbar: any = null;

@Component({
  selector: 'app-cupon',
  templateUrl: './cupon.component.html',
  styleUrls: ['./cupon.component.css']
})
export class CuponComponent implements OnInit {
  ngModel: Cupon;
  fechaFinv = '';
  cupon: Cupon;
  alertBody = '';

  constructor(private eventService: EventoService, private route: ActivatedRoute,  private router: Router) {
    this.ngModel = new Cupon();
  }

  ngOnInit(): void {
    progressbar = document.getElementById('img-upload-bar');
    M.AutoInit();
    this.route.paramMap.subscribe(params => {
      if (params.has("id")) {
        this.eventService.getCupon(params.get("id") || "").subscribe(res => {
          this.cupon = res as Cupon;
          this.inicializarDatos();
        });
      }
    });

    const elems = document.querySelectorAll('.datepicker');
    M.Datepicker.init(elems, {
      i18n: {cancel: 'Cancelar', done: 'Aceptar'},
      format: 'dd-mm-yyyy',
    });
  }

  guardarCupon(actForm: NgForm) {
    if (actForm.value.nombre != '') {
      this.alertBody = 'Guardando cupón: ';
      const elems = document.getElementById('modal1');
      const instances = M.Modal.init(elems, {dismissible: false});
      instances.open();
      const cupon: Cupon = new Cupon();
      cupon.nombre = actForm.value.nombre;
      cupon.descuento = actForm.value.descuento;
      cupon.caducidad = this.fechaFinv;
      progressbar.setAttribute('value', String(0));

      this.route.paramMap.subscribe(params => {
        if (params.has("id")) {
          this.eventService.putCupon(params.get("id"), cupon).subscribe(() => {
            M.toast({html: 'Producto guardado correctamente', classes: 'rounded'});
            this.router.navigate(['/']);
            instances.close();
          });
        } else {
          this.eventService.postCupon(cupon).subscribe(() => {
            M.toast({html: 'Producto guardado correctamente', classes: 'rounded'});
            this.router.navigate(['/']);
            instances.close();
          });
        }
      });
    } else {
      M.toast({html: 'Debe completar todos los campos primero!', classes: 'rounded'});
    }
  }

  private inicializarDatos() {
    this.ngModel.nombre = this.cupon.nombre;
    this.ngModel.descuento = this.cupon.descuento;
    this.ngModel.caducidad = this.cupon.caducidad;
    const time_fin = <HTMLInputElement>document.getElementById('time-fin');
    time_fin.value = this.cupon.caducidad;
    const labels = ['label1','label2','label3'];
    for (let i = 0; i < labels.length; i++) {
      const label = <HTMLLabelElement>document.getElementById(labels[i]);
      label.classList.add('active');
    }
  }
}
