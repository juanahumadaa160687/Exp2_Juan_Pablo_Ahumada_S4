import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgOptimizedImage,
    CommonModule,
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})

export class NavbarComponent {

  user: string = sessionStorage.getItem("username") || "";
  role: string = sessionStorage.getItem("role") || "";

  carro_compra : [] = JSON.parse(localStorage.getItem("carro_compra") || "[]");

  constructor(private router: Router) {}

  ngOnInit() {
    let carrito_compras: HTMLAnchorElement = document.getElementById("carrito_compras") as HTMLAnchorElement;

    let badge: HTMLSpanElement = document.createElement("span");
    let badge2: HTMLSpanElement = document.createElement("span");

    if (this.carro_compra.length > 0) {
      badge.classList.add('badge', 'bg-danger', 'position-absolute', 'top-3', 'start-100', 'translate-middle', 'rounded-circle', 'border', 'border-light');
      badge.innerText = this.carro_compra.length.toString();

      badge2.classList.add('visually-hidden');
      badge2.innerText = "Productos en el carrito";

      badge.appendChild(badge2);
      carrito_compras.appendChild(badge);
    }
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/home']);
  }

}

