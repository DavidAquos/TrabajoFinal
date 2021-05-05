import { Component, OnInit } from '@angular/core';
import {RedSocial} from "../../models/RedSocial";
import {EventoService} from "../../services/evento.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import axios from "axios";

declare const M: any;

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/djlgdcqhg/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'rdzzccwc';
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
  private file1: any;
  img: String | ArrayBuffer = 'assets/img-not-found.png';


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

  async guardarSocial(actForm: NgForm) {
    if (actForm.value.nombre != '' && actForm.value.url != '' && actForm.value.img != '') {
      this.alertBody = 'Guardando Red Social ';
      const elems = document.getElementById('modal1');
      const instances = M.Modal.init(elems, {dismissible: false});
      instances.open();
      const redSocial: RedSocial = new RedSocial();
      redSocial.nombre = actForm.value.nombre;
      redSocial.url = actForm.value.url;
      redSocial.img = await this.uploadimg(1);
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

  private inicializarDatos() {
    this.ngModel.nombre = this.redSocial.nombre;
    this.ngModel.img = this.redSocial.img;
    this.ngModel.url = this.redSocial.url;
    const labels = ['label1','label2'];
    for (let i = 0; i < labels.length; i++) {
      const label = <HTMLLabelElement>document.getElementById(labels[i]);
      label.classList.add('active');
    }
    this.file1 = this.redSocial.img;
    this.img = this.redSocial.img;
  }

}
