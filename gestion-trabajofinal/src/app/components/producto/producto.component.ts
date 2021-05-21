import { Component, OnInit } from '@angular/core';
import {Producto} from "../../models/Producto";
import {EventoService} from "../../services/evento.service";
import {ActivatedRoute, Router} from "@angular/router";
import axios from 'axios';
import {NgForm} from "@angular/forms";

declare const M: any;

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/djlgdcqhg/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'rdzzccwc';
let progressbar: any = null;

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  ngModel: Producto;
  horaIniciov = '';
  img: String | ArrayBuffer = 'assets/img-not-found.png';
  private file1: any;
  producto: Producto;
  alertBody = '';

  constructor(private eventService: EventoService, private route: ActivatedRoute, private router: Router) {
    this.ngModel = new Producto();
  }

  ngOnInit(): void {
    progressbar = document.getElementById('img-upload-bar');
    M.AutoInit();
    this.route.paramMap.subscribe(params => {
      if (params.has("id")) {
        this.eventService.getproducto(params.get("id") || "").subscribe(res => {
          this.producto = res as Producto;
          this.inicializarDatos();
        });
      }
    });
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
          case 2:
        }
      }
    }
  }

  private inicializarDatos() {
    this.ngModel.nombre = this.producto.nombre;
    this.ngModel.descripcion = this.producto.descripcion;
    this.ngModel.codigo = this.producto.codigo;
    this.ngModel.precio = this.producto.precio;
    const labels = ['label1', 'label2', 'label3', 'label4'];
    for (let i = 0; i < labels.length; i++) {
      const label = <HTMLLabelElement>document.getElementById(labels[i]);
      label.classList.add('active');
    }
    this.file1 = this.producto.img;
    this.img = this.producto.img;
  }

  async guardarProducto(actForm: NgForm) {
    if (actForm.value.nombre != '' && actForm.value.descripcion != '' && actForm.value.precio != null && actForm.value.codigo != null) {
      this.alertBody = 'Guardando producto ';
      const elems = document.getElementById('modal1');
      const instances = M.Modal.init(elems, {dismissible: false});
      instances.open();
      const producto: Producto = new Producto();
      producto.nombre = actForm.value.nombre;
      producto.descripcion = actForm.value.descripcion;
      producto.precio = actForm.value.precio;
      producto.codigo = actForm.value.codigo;
      producto.img = await this.uploadimg(1);
      progressbar.setAttribute('value', String(0));

      this.route.paramMap.subscribe(params => {
        if (params.has("id")) {
          this.eventService.putProducto(params.get("id"), producto).subscribe(() => {
            M.toast({html: 'Producto guardado correctamente', classes: 'rounded'});
            this.router.navigate(['/']);
            instances.close();
          });
        } else {
          this.eventService.postProducto(producto).subscribe(() => {
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

  async uploadimg(number: number) {
    let file: any;
    if (number === 1) {
      file = this.file1;
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
  }
}
