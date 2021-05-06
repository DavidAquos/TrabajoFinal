import { Component, OnInit } from '@angular/core';
import {Promocion} from "../../models/Promocion";
import {EventoService} from "../../services/evento.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import axios from "axios";

declare const M: any;
let progressbar: any = null;

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/djlgdcqhg/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'rdzzccwc';

@Component({
  selector: 'app-promocion',
  templateUrl: './promocion.component.html',
  styleUrls: ['./promocion.component.css']
})
export class PromocionComponent implements OnInit {

  ngModel: Promocion;
  promocion: Promocion;
  alertBody = '';
  private file1: any;
  img: String | ArrayBuffer = 'assets/img-not-found.png';

  constructor(private eventService: EventoService, private route: ActivatedRoute,  private router: Router) {
    this.ngModel = new Promocion();
  }

  ngOnInit(): void {
    progressbar = document.getElementById('img-upload-bar');
    M.AutoInit();
    this.route.paramMap.subscribe(params => {
      if (params.has("id")) {
        this.eventService.getPromocion(params.get("id") || "").subscribe(res => {
          this.promocion = res as Promocion;
          this.inicializarDatos();
        });
      }
    });
  }

  private inicializarDatos() {
    this.ngModel.nombre = this.promocion.nombre;
    this.ngModel.descripcion = this.promocion.descripcion;
    this.ngModel.img = this.promocion.img;
    const labels = ['label1', 'label2'];
    for (let i = 0; i < labels.length; i++) {
      const label = <HTMLLabelElement>document.getElementById(labels[i]);
      label.classList.add('active');
    }
    this.file1 = this.promocion.img;
    this.img = this.promocion.img;
  }

  async guardarPromocion(actForm: NgForm) {
    if (actForm.value.nombre != '' && actForm.value.img != '') {
      this.alertBody = 'Guardando promoción ';
      const elems = document.getElementById('modal1');
      const instances = M.Modal.init(elems, {dismissible: false});
      instances.open();
      const promocion: Promocion = new Promocion();
      promocion.nombre = actForm.value.nombre;
      promocion.descripcion = actForm.value.descripcion;
      promocion.img = await this.uploadimg(1);
      progressbar.setAttribute('value', String(0));

      this.route.paramMap.subscribe(params => {
        if (params.has("id")) {
          this.eventService.putPromocion(params.get("id"), promocion).subscribe(() => {
            M.toast({html: 'Promoción guardada correctamente', classes: 'rounded'});
            this.router.navigate(['/']);
            instances.close();
          });
        } else {
          this.eventService.postPromocion(promocion).subscribe(() => {
            M.toast({html: 'Promoción guardada correctamente', classes: 'rounded'});
            this.router.navigate(['/']);
            instances.close();
          });
        }
      });
    } else {
      M.toast({html: 'Debe completar todos los campos primero!', classes: 'rounded'});
    }
  }

  async uploadimg(number: number) {
    let file: any;
    if (number === 1) {
      file = this.file1;
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    const res = await axios.post(
      CLOUDINARY_URL,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress(e) {
          var progress = Math.round((e.loaded * 100.0) / e.total);
          progressbar.setAttribute('value', String(progress));
        }
      }
    );
    return res.data.url;
  }

  onSelectFile(event, number: number) {
    if (event.target.files && event.target.files[0]) {
      switch (number) {
        case 1:
          this.file1 = event.target.files[0];
          break;
      }
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (eventt) => {
        switch (number) {
          case 1:
            this.img = eventt.target.result;
            break;
        }
      }
    }
  }

}
