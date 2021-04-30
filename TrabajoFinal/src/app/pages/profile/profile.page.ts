import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  usuario: {
    nombre: string,
    email: string,
    password: string,
    password2: string,
    telefono: number,
  };

  showPassword = false;
  showPassword2 = false;
  passwordToggleIcon = 'eye';
  passwordToggleIcon2 = 'eye';

  constructor(public toastController: ToastController, fb: FormBuilder) {

  }

  // form: FormGroup;

  ngOnInit() {
    this.usuario = {
      nombre: null, email: null, password: null, password2: null, telefono: null
    };
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
