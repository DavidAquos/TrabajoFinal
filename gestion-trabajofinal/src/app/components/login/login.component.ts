import { Component, OnInit } from '@angular/core';
import {User} from "../../models/User";
import {Router} from "@angular/router";

declare const M: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  login(email: HTMLInputElement, password: HTMLInputElement) {
    const user = new User();
    user.correo = email.value;
    user.pw = password.value;
    M.toast({html: 'Email o contraseña incorrecto', classes: 'rounded'});
  }
}
