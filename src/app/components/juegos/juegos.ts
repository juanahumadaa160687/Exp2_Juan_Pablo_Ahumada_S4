import {Component, OnInit} from '@angular/core';
import {Footer} from '../footer/footer';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';
import {NavbarComponent} from '../navbar/navbar';
import {NgOptimizedImage} from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-juegos',
  imports: [
    Footer,
    RouterOutlet,
    NavbarComponent,
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './juegos.html',
  styleUrl: './juegos.css',
})
export class Juegos implements OnInit {

  categoria: string = '';

  juegos_all = JSON.parse(localStorage.getItem('productos') || '[]');

  juegos: Array<any> = [];


  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {

    let categoriaParam = this.activatedRoute.snapshot.paramMap.get('categoria');

    if (categoriaParam === 'mesa') {
      this.categoria = 'Juegos de Mesa';
      this.juegos = this.juegos_all.filter((j: any) => j.categoria === 'Juegos de Mesa');
      return;
    }
    else if (categoriaParam === 'cartas') {
      this.categoria = 'Juegos de Cartas';
      this.juegos = this.juegos_all.filter((j: any) => j.categoria === 'Juegos de Cartas');
      return;

    }
    else if (categoriaParam === 'rol') {
      this.categoria = 'Juegos de Rol';
      this.juegos = this.juegos_all.filter((j: any) => j.categoria === 'Juegos de Rol');
      return;
    }

  }

  comprarJuego(id: number) {

    let user_exists = sessionStorage.getItem('username');

    if (user_exists) {

      let shoppingCart = JSON.parse(localStorage.getItem('carrito') || '[]');

      let juego = this.juegos.find((j: any) => j.id === id);

      shoppingCart.push(juego);

      localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));

      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Juego agregado al carrito de compras',
        timer: 3000
      }).then((result) => {
        location.reload();
      });
    }

    else {
      Swal.fire({
        icon: 'info',
        text: 'Debes iniciar sesión para comprar este juego',
        showConfirmButton: true,
        confirmButtonText: 'Iniciar Sesión',
        showCancelButton: true,
      }).then(result => {
        if (result.isConfirmed) {
          this.router.navigate(['/sign-in']);
        }
        else {
          location.reload();
        }
      });
    }
  }
}

