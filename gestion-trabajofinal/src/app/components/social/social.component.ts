import { Component, OnInit } from '@angular/core';
import {RedSocial} from "../../models/RedSocial";
import {EventoService} from "../../services/evento.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";

declare const M: any;
let progressbar: any = null;

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {
  ngModel: RedSocial;
  redSocial: RedSocial;
  alertBody = '';


  constructor(private eventService: EventoService, private route: ActivatedRoute,  private router: Router) {
    this.ngModel = new RedSocial();
  }

  ngOnInit(): void {
    progressbar = document.getElementById('img-upload-bar');
    M.AutoInit();
    this.route.paramMap.subscribe(params => {
      if (params.has("id")) {
        this.eventService.getSocial(params.get("id") || "").subscribe(res => {
          this.redSocial = res as RedSocial;
          this.inicializarDatos();
        });
      }
    });
  }

  guardarSocial(actForm: NgForm) {
    if (actForm.value.nombre != '') {
      this.alertBody = 'Guardando Red Social ';
      const elems = document.getElementById('modal3');
      const instances = M.Modal.init(elems, {dismissible: false});
      instances.open();
      const redSocial: RedSocial = new RedSocial();
      redSocial.nombre = actForm.value.nombre;
      redSocial.url = actForm.value.url;
      redSocial.img = actForm.value.img;
      progressbar.setAttribute('value', String(0));

      this.route.paramMap.subscribe(params => {
        if (params.has("id")) {
          this.eventService.putSocial(params.get("id"), redSocial).subscribe(() => {
            M.toast({html: 'Red social guardada correctamente', classes: 'rounded'});
            this.router.navigate(['/']);
            instances.close();
          });
        } else {
          this.eventService.postSocial(redSocial).subscribe(() => {
            M.toast({html: 'Red social guardada correctamente', classes: 'rounded'});
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
    this.ngModel.nombre = this.redSocial.nombre;
    this.ngModel.img = this.redSocial.img;
    this.ngModel.url = this.redSocial.url;
    const labels = ['label1','label2','label3'];
    for (let i = 0; i < labels.length; i++) {
      const label = <HTMLLabelElement>document.getElementById(labels[i]);
      label.classList.add('active');
    }
  }

}
