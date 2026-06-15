import { Component } from '@angular/core';
import {RouterOutlet, Router, ActivatedRoute} from '@angular/router';
import {NavbarComponent} from '../navbar/navbar';
import {Footer} from '../footer/footer';
import Swal from 'sweetalert2';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-pass-recover',
  imports: [
    RouterOutlet,
    NavbarComponent,
    Footer,
    FormsModule
  ],
  templateUrl: './pass-recover.html',
  styleUrl: './pass-recover.css',
})
export class PassRecover {

  user_email: string = '';

  password: string = '';
  confirm_password: string = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {

    this.user_email = this.activatedRoute.snapshot.paramMap.get('email') || '';
  }

  userEmail(){

    let users = JSON.parse(localStorage.getItem('users') || '[]');
    let user = users.find((u: any) => u.email === this.user_email);

    if (!user) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se encontró ningún usuario con ese correo electrónico.',
        timer: 3000
      }).then((result) => {
        location.reload();
      })
    }
    else {
      this.router.navigate(['/password-reset', {email: this.user_email}]);
    }
  }

  recoverPassword() {
    if (this.password !== this.confirm_password) {
      alert('Passwords do not match!');
      return;
    }
    else if (!this.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) === null) {
      alert('Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters.');
      return;
    }
    else {
      let users = JSON.parse(localStorage.getItem('users') || '[]');
      let userIndex = users.findIndex((u: any) => u.email === this.user_email);
      let user = users[userIndex];

      users.splice(userIndex, 1);

      user ={
        nombre: user.nombre,
        apellido: user.apellido,
        username: user.username,
        email: user.email,
        direccion: user.direccion,
        fecha_nacimiento: user.fecha_nacimiento,
        password: this.password,
        imagen: user.imagen,
        role: user.role,
      }

      localStorage.setItem('users', JSON.stringify(user));

      Swal.fire({
        icon: 'success',
        title: 'Password actualizado con éxito',
        showConfirmButton: false,
        timer: 3000
      }).then((result) => {
        this.router.navigate(['/login']);
      })

    }
  }
}
