import { Component } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {RouterOutlet, Router, RouterLink} from "@angular/router";
import {Footer} from '../footer/footer';
import {NavbarComponent} from '../navbar/navbar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  imports: [
    RouterOutlet,
    CommonModule,
    Footer,
    NavbarComponent,
    NgOptimizedImage,
    RouterLink,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  prod_destacados = JSON.parse(localStorage.getItem("productos") || "[]");

  constructor(private router: Router) {}

  addCart(id: number): void {

    let user_exists = sessionStorage.getItem("username");

    if (user_exists) {
      let cart = JSON.parse(localStorage.getItem("carrito") || "[]");

      let productos = JSON.parse(localStorage.getItem("productos") || "[]");

      let producto = productos.find((prod: any) => prod.id === id);

      cart.push(producto);

      localStorage.setItem("carrito", JSON.stringify(cart));

      Swal.fire({
        title: 'Producto añadido al carrito',
        icon: 'success',
        timer: 3000,
      }).then(() => {
        window.location.reload();
      });
    }
    else {
      Swal.fire({
        icon: 'info',
        text: 'Inicia sesión para añadir productos al carrito',
        showConfirmButton: true,
        confirmButtonText: 'Iniciar Sesión',
        showCancelButton: true,
        focusConfirm: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/sign-in']);
        }
        else {
          location.reload();
        }
      })
    }

  }

}
