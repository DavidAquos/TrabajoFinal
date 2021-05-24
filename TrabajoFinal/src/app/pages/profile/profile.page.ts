import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {ToastController} from '@ionic/angular';
import {DataService} from "../../services/data.service";
import {Usuario} from "../../interface/interface";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  usuario: Usuario = {_id: '', nombre: '', id_cupones_usado: [], id_cupones: [], apellidos: '', correo: '', datos_tarjeta: '', direcciones: [], nivel: '', pw: '', num_telefono: 0};

  showPassword = false;
  showPassword2 = false;
  passwordToggleIcon = 'eye';
  passwordToggleIcon2 = 'eye';

  constructor(public toastController: ToastController, fb: FormBuilder, private dataService: DataService) {

  }

  // form: FormGroup;

  ngOnInit() {
    this.dataService.getUsuario().subscribe(res => {
      this.usuario = res as Usuario;
      console.log(this.usuario);
    });

  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
    if (this.passwordToggleIcon === 'eye'){
      this.passwordToggleIcon = 'eye-off';
    }else {
      this.passwordToggleIcon = 'eye';
    }
  }

  togglePassword2(): void {
    this.showPassword2 = !this.showPassword2;
    if (this.passwordToggleIcon2 === 'eye'){
      this.passwordToggleIcon2 = 'eye-off';
    }else {
      this.passwordToggleIcon2 = 'eye';
    }
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      const password = group.controls[passwordKey];
      const confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    };
  }

  enviarFormularioRegistro(formulario: NgForm) {
    console.log('Formulario: ', formulario, this.usuario);
  }

  registro() {
    // this.comprobarPws();
    this.presentToast();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Datos actualizados correctamente',
      duration: 2000
    });
    await toast.present();
  }

  onSelectFile($event: Event, number: number) {

  }
}
