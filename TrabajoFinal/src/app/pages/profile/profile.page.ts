import {Component, OnInit} from '@angular/core';
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

  usuario: Usuario = {
    _id: '',
    nombre: '',
    pw: '',
    correo: '',
    num_telefono: 0,
    nivel: '',
    direcciones: [],
    apellidos: '',
    datos_tarjeta: '',
    id_cupones_usado: [],
    id_cupones: []
  };
  ngModel: Usuario;

  showPassword = false;
  showPassword2 = false;
  isEdit = false;
  passwordToggleIcon = 'eye';
  passwordToggleIcon2 = 'eye';

  constructor(public toastController: ToastController, fb: FormBuilder, private dataService: DataService) {
    this.ngModel = {
      _id: '',
      nombre: '',
      pw: '',
      correo: '',
      num_telefono: 0,
      nivel: '',
      direcciones: [],
      apellidos: '',
      datos_tarjeta: '',
      id_cupones_usado: [],
      id_cupones: []
    }
  }

  ngOnInit() {
    this.dataService.getUsuario().subscribe(res => {
      this.usuario = res as Usuario;
    });

    document.getElementsByClassName('edit-button')[0].addEventListener('click', function() {
      this.isEdit = !this.isEdit;

      document.getElementsByClassName('edit-button')[0].classList.add('opacity-0');
      document.getElementsByClassName('save-user-button')[0].classList.remove('opacity-0');
      Array.from(document.getElementsByTagName('input')).forEach(s => {
        s.setAttribute('disabled', 'false');
      });
    }.bind(this));

    document.getElementsByClassName('save-user-button')[0].addEventListener('click', function() {
      this.isEdit = !this.isEdit;

      document.getElementsByClassName('edit-button')[0].classList.remove('opacity-0');
      document.getElementsByClassName('save-user-button')[0].classList.add('opacity-0');
      Array.from(document.getElementsByTagName('input')).forEach(s => {
        s.setAttribute('disabled', '');
      });

      this.actualizarDatos();
    }.bind(this));
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
    if (this.passwordToggleIcon === 'eye') {
      this.passwordToggleIcon = 'eye-off';
    } else {
      this.passwordToggleIcon = 'eye';
    }
  }

  togglePassword2(): void {
    this.showPassword2 = !this.showPassword2;
    if (this.passwordToggleIcon2 === 'eye') {
      this.passwordToggleIcon2 = 'eye-off';
    } else {
      this.passwordToggleIcon2 = 'eye';
    }
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      const password = group.controls[passwordKey];
      const confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    };
  }

  actualizarDatos() {
    this.dataService.putUsuario(this.usuario._id, this.usuario).subscribe(resUsuario => {
      this.presentToast('Usuario actualizado correctamente!');
    });
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    await toast.present();
  }

  enviar(actForm: NgForm){
    this.dataService.putUsuario(this.usuario._id, this.usuario).subscribe();
  }
}
