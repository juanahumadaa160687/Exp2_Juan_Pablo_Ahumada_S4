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

  constructor(private router: Router) {

  }

  saveUser(): void {

    let users = JSON.parse(localStorage.getItem("users") || "[]");

    let first_name: string = document.getElementById("nombre")?.textContent || "";
    let last_name: string = document.getElementById("apellido")?.textContent || "";
    let username: string = document.getElementById("username")?.textContent || "";
    let email: string = document.getElementById("email")?.textContent || "";
    let birthdate: string = document.getElementById("fecha_nacimiento")?.textContent || "";
    let address: string = document.getElementById("direccion")?.textContent || "";
    let password: string = document.getElementById("password")?.textContent || "";
    let confirm_password: string = document.getElementById("confirmPassword")?.textContent || "";
    let role: string = document.getElementById("role")?.textContent || "";

    let nombre_feedback: HTMLDivElement = document.getElementById("nombre_feedback") as HTMLDivElement;
    let apellido_feedback: HTMLDivElement = document.getElementById("apellido_feedback") as HTMLDivElement;
    let username_feedback: HTMLDivElement = document.getElementById("username_feedback") as HTMLDivElement;
    let email_feedback: HTMLDivElement = document.getElementById("email_feedback") as HTMLDivElement;
    let birthdate_feedback: HTMLDivElement = document.getElementById("fecha_nacimiento_feedback") as HTMLDivElement;
    let password_feedback: HTMLDivElement = document.getElementById("password_feedback") as HTMLDivElement;
    let confirmPasswordFeedback: HTMLDivElement = document.getElementById("confirmPassword_feedback") as HTMLDivElement;

    let username_exists = users.some((user: any) => user.username === username);
    let email_exists = users.some((user: any) => user.email === email);

    if (first_name == ""){
      nombre_feedback.innerText = "Este campo es obligatorio";
      nombre_feedback.style.display = "block";

      setTimeout(() => {
        nombre_feedback.style.display = "none";
      }, 3500)
    }
    else if (last_name == ""){
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
    else if (username == "") {
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
    else if (!email.includes("@") || !email.includes(".")) {
      email_feedback.innerText = "El email no valido";
      email_feedback.style.display = "block";

      setTimeout(() => {
        email_feedback.style.display = "none";
      }, 3500)
    }
    else if (email == "") {
      email_feedback.innerText = "Este campo es obligatorio";
      email_feedback.style.display = "block";

      setTimeout(() => {
        email_feedback.style.display = "none";
      }, 3500)
    }
    else if (birthdate == "") {
      birthdate_feedback.innerText = "Este campo es obligatorio";
      birthdate_feedback.style.display = "block";

      setTimeout(() => {
        birthdate_feedback.style.display = "none";
      }, 3500)
    }
    else if (new Date(birthdate) > new Date()) {
      birthdate_feedback.innerText = "La fecha de nacimiento no puede ser en el futuro";
      birthdate_feedback.style.display = "block";

      setTimeout(() => {
        birthdate_feedback.style.display = "none";
      }, 3500)
    }
    else if (new Date().getFullYear() - new Date(birthdate).getFullYear() < 18) {
      birthdate_feedback.innerText = "Debes ser mayor de 18 años para registrarte";
      birthdate_feedback.style.display = "block";

      setTimeout(() => {
        birthdate_feedback.style.display = "none";
      }, 3500)
    }
    else if (password == "" || !password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
      password_feedback.innerText = "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial @$!%*?&";
      password_feedback.style.display = "block";

      setTimeout(() => {
        password_feedback.style.display = "none";
      }, 3500)
    }
    else if (confirm_password == "") {
      confirmPasswordFeedback.innerText = "Este campo es obligatorio";
      confirmPasswordFeedback.style.display = "block";

      setTimeout(() => {
        confirmPasswordFeedback.style.display = "none";
      }, 3500)
    }
    else if (password != confirm_password) {
      confirmPasswordFeedback.innerText = "Las contraseñas no coinciden";
      confirmPasswordFeedback.style.display = "block";

      setTimeout(() => {
        confirmPasswordFeedback.style.display = "none";
      }, 3500)
    }
    else {

      let user = {
        nombre: first_name,
        apellido: last_name,
        username: username,
        email: email,
        fecha_nacimiento: birthdate,
        direccion: address,
        password: password,
        role: role,
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
