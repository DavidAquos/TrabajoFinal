import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  usuario: {
    email: string,
    password: string,
  };
  constructor() { }

  ngOnInit() {
    this.usuario = {email : null, password : null};
  }

  enviarFormularioLogin(formulario: NgForm) {
    console.log('Formulario: ', formulario, this.usuario);
  }
}
