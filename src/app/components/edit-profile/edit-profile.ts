import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-profile',
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.css',
})
export class EditProfile {

  constructor(private router: Router) {}

  users = JSON.parse(localStorage.getItem('users') || '[]');

  user = this.users.find((u: any) => u.username === sessionStorage.getItem('username')) || {};

  nombre = this.user.nombre || this.user.nombre;
  apellido = this.user.apellido || this.user.apellido;
  email = this.user.email || this.user.email;
  username = this.user.username || this.user.username;
  fecha_nacimiento = this.user.fecha_nacimiento || this.user.fecha_nacimiento;
  direccion = this.user.direccion || this.user.direccion;
  imagen = this.user.imagen || this.user.imagen;

  saveChanges(){

    let index_user = this.users.findIndex(u => u.username === this.user.username);

    this.users.splice(index_user, 1);

    let saved_user = {
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
      username: this.username,
      fecha_nacimiento: this.fecha_nacimiento,
      direccion: this.direccion,
      imagen: this.imagen,
    }
    localStorage.setItem('users', JSON.stringify(this.users));

    Swal.fire({
      icon: 'success',
      title: 'Perfil actualizado',
      timer: 3000
    }).then((result) => {

      this.router.navigate(['/user-profile', {username: this.username}]);
    })


  }


}
