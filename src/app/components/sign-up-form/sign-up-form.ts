import {Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar';
import { Footer } from '../footer/footer';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up-form',
  standalone: true,

  imports: [
    FormsModule,
    CommonModule,
    NavbarComponent,
    Footer,
    RouterOutlet,
  ],
  templateUrl: './sign-up-form.html',
  styleUrl: './sign-up-form.css',
})
export class SignUpForm {

  nombre: string = '';
  apellido: string = '';
  email: string = '';
  username: string = '';
  birthday: string = '';
  address: string = '';
  password: string = '';
  confirmPassword: string = '';
  role = 'usuario';
  imagen: string = '';

  constructor(private router: Router) {

  }

  saveUser(): void {

    let users = JSON.parse(localStorage.getItem("users") || "[]");


    let nombre_feedback: HTMLDivElement = document.getElementById("nombre_feedback") as HTMLDivElement;
    let apellido_feedback: HTMLDivElement = document.getElementById("apellido_feedback") as HTMLDivElement;
    let username_feedback: HTMLDivElement = document.getElementById("username_feedback") as HTMLDivElement;
    let email_feedback: HTMLDivElement = document.getElementById("email_feedback") as HTMLDivElement;
    let birthday_feedback: HTMLDivElement = document.getElementById("fecha_nacimiento_feedback") as HTMLDivElement;
    let password_feedback: HTMLDivElement = document.getElementById("password_feedback") as HTMLDivElement;
    let confirmPasswordFeedback: HTMLDivElement = document.getElementById("confirmPassword_feedback") as HTMLDivElement;

    let username_exists = users.some((user: any) => user.username === this.username);
    let email_exists = users.some((user: any) => user.email === this.email);

    if (this.nombre == ""){
      nombre_feedback.innerText = "Este campo es obligatorio";
      nombre_feedback.style.display = "block";

      setTimeout(() => {
        nombre_feedback.style.display = "none";
      }, 3500)
    }
    else if (this.apellido == ""){
      apellido_feedback.innerText = "Este campo es obligatorio";
      apellido_feedback.style.display = "block";

      setTimeout(() => {
        apellido_feedback.style.display = "none";
      }, 3500)
    }
    else if (username_exists) {
      username_feedback.innerText = "Username ya existe";
      username_feedback.style.display = "block";

      setTimeout(() => {
        username_feedback.style.display = "none";
      }, 3500)
    }
    else if (this.username == "") {
      username_feedback.innerText = "Este campo es obligatorio";
      username_feedback.style.display = "block";

      setTimeout(() => {
        username_feedback.style.display = "none";
      }, 3500)
    }
    else if (email_exists) {
      email_feedback.innerText = "Email ya existe";
      email_feedback.style.display = "block";

      setTimeout(() => {
        email_feedback.style.display = "none";
      }, 3500)
    }
    else if (!this.email.includes("@") || !this.email.includes(".")) {
      email_feedback.innerText = "El email no valido";
      email_feedback.style.display = "block";

      setTimeout(() => {
        email_feedback.style.display = "none";
      }, 3500)
    }
    else if (this.email == "") {
      email_feedback.innerText = "Este campo es obligatorio";
      email_feedback.style.display = "block";

      setTimeout(() => {
        email_feedback.style.display = "none";
      }, 3500)
    }
    else if (this.birthday == "") {
      birthday_feedback.innerText = "Este campo es obligatorio";
      birthday_feedback.style.display = "block";

      setTimeout(() => {
        birthday_feedback.style.display = "none";
      }, 3500)
    }
    else if (new Date(this.birthday) > new Date()) {
      birthday_feedback.innerText = "La fecha de nacimiento no puede ser en el futuro";
      birthday_feedback.style.display = "block";

      setTimeout(() => {
        birthday_feedback.style.display = "none";
      }, 3500)
    }
    else if (new Date().getFullYear() - new Date(this.birthday).getFullYear() < 18) {
      birthday_feedback.innerText = "Debes ser mayor de 18 años para registrarte";
      birthday_feedback.style.display = "block";

      setTimeout(() => {
        birthday_feedback.style.display = "none";
      }, 3500)
    }
    else if (this.password == "" || !this.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
      password_feedback.innerText = "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial @$!%*?&";
      password_feedback.style.display = "block";

      setTimeout(() => {
        password_feedback.style.display = "none";
      }, 3500)
    }
    else if (this.confirmPassword == "") {
      confirmPasswordFeedback.innerText = "Este campo es obligatorio";
      confirmPasswordFeedback.style.display = "block";

      setTimeout(() => {
        confirmPasswordFeedback.style.display = "none";
      }, 3500)
    }
    else if (this.password != this.confirmPassword) {
      confirmPasswordFeedback.innerText = "Las contraseñas no coinciden";
      confirmPasswordFeedback.style.display = "block";

      setTimeout(() => {
        confirmPasswordFeedback.style.display = "none";
      }, 3500)
    }
    else {

      let user = {
        nombre: this.nombre,
        apellido: this.apellido,
        username: this.username,
        email: this.email,
        fecha_nacimiento: this.birthday,
        direccion: this.address,
        password: this.password,
        role: this.role,
        imagen: this.imagen ? this.imagen : "profile-pic/default_profile-pic.svg",
      }

      users.push(user);

      localStorage.setItem("users", JSON.stringify(users));

      Swal.fire({
        icon: 'success',
        title: 'Usuario registrado exitosamente',
        showConfirmButton: false,
        timer: 3500
      }).then(() => {
        this.router.navigate(['login'])
      })
    }
  }

}
