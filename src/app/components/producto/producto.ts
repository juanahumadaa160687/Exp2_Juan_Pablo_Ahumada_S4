import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterOutlet, Router} from '@angular/router';
import {NavbarComponent} from '../navbar/navbar';
import {Footer} from '../footer/footer';
import Swal from 'sweetalert2';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-producto',
  imports: [
    RouterOutlet,
    NavbarComponent,
    Footer,
    NgOptimizedImage
  ],
  templateUrl: './producto.html',
  styleUrl: './producto.css',
})
export class Producto implements OnInit {

  id_producto: string = '';
  nombre_producto: string = '';
  descripcion_producto: string = '';
  imagen_producto: string = '';
  precio_producto: string = '';
  stock_producto: string = '';

  productos = JSON.parse(localStorage.getItem('productos') || '[]');

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {

    let idParam = parseInt(this.activatedRoute.snapshot.paramMap.get('id') || '0');

    let producto = this.productos.find((p: any) => p.id === idParam || '0');

    if (producto) {
      this.id_producto = producto.id;
      this.nombre_producto = producto.nombre;
      this.descripcion_producto = producto.descripcion;
      this.imagen_producto = producto.imagen;
      this.precio_producto = producto.precio;
      this.stock_producto = producto.stock;
    }

  }

  agregarCarro(id:string){

    let user_exists = sessionStorage.getItem('username');

    if(user_exists){
      let shoppingCart = JSON.parse(sessionStorage.getItem('carrito') || '[]');

      let producto = this.productos.find((p: any) => p.id === id);

      shoppingCart.push(producto);

      sessionStorage.setItem('carrito', JSON.stringify(shoppingCart));

      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Producto agregado al carrito de compras',
        timer: 3000
      }).then((result) => {
        location.reload();
      });
    }
    else {

      Swal.fire({
        icon: 'info',
        text: 'Debes iniciar sesión para agregar productos al carrito de compras',
        showConfirmButton: true,
        confirmButtonText: 'Iniciar Sesión',
        showCancelButton: true,
        cancelButtonText: 'Cancelar'
      }).then((result) => {
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
