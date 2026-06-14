import { Component } from '@angular/core';
import {RouterLink, RouterOutlet, Router} from '@angular/router';
import {NavbarComponent} from '../navbar/navbar';
import {Footer} from '../footer/footer';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-in-form',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    Footer,
    RouterLink
  ],
  templateUrl: './sign-in-form.html',
  styleUrl: './sign-in-form.css',
})
export class SignInForm {

  constructor(private router: Router) {}

  ngOnInit() {

    let user = sessionStorage.getItem("username") || "";

    if (user !== "") {
      Swal.fire({
        title: 'Ya has iniciado sesión',
        text: 'Redirigiendo a la página de inicio...',
        icon: 'info',
        timer: 3000,
        showConfirmButton: false,
      }).then(() => {
        this.router.navigate(['/home']);
      });
    }

  }

  userLogin() {
    let login_username: string = document.getElementById("username")?.textContent || "";
    let login_password: string = document.getElementById("password")?.textContent || "";

    let feedback_username: HTMLDivElement = document.getElementById("feedback_username") as HTMLDivElement;
    let feedback_password: HTMLDivElement = document.getElementById("feedback_password") as HTMLDivElement;

    let users = JSON.parse(localStorage.getItem("users") || "[]");
    let user = users.find((user: any) => user.username === login_username);

    let user_username = user.username;
    let user_password = user.password;
    let user_role = user.role;

    if (user_username === "" || user_username === null) {
      feedback_username.innerHTML = "El usuario no existe";
      feedback_username.style.display = "block";

      setTimeout(() => {
        feedback_username.style.display = "none";
      }, 3500);
    }
    else {
      if (login_username === user_username && login_password === user_password) {
        sessionStorage.setItem("username", user_username);
        sessionStorage.setItem("role", user_role);

        this.router.navigate(['/home']);
      }
      else {
        feedback_password.innerHTML = "Contraseña incorrecta";
        feedback_password.style.display = "block";

        setTimeout(() => {
          feedback_password.style.display = "none";
        }, 3500);
      }
    }
  }

}
