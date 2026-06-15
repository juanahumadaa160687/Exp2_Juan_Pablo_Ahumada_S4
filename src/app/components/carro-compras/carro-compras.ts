import { Component } from '@angular/core';
import {RouterOutlet, Router} from '@angular/router';
import {NavbarComponent} from '../navbar/navbar';
import {Footer} from '../footer/footer';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carro-compras',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    Footer
  ],
  templateUrl: './carro-compras.html',
  styleUrl: './carro-compras.css',
})
export class CarroCompras {

  carrito_usuario = JSON.parse(localStorage.getItem('carrito') || '[]');

  formatoCLP = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  });

  total_final: number = 0;
  total = this.formatoCLP.format(this.total_final);

  constructor(private router: Router) {}

  ngOnInit(): void {

    let user_logged = sessionStorage.getItem('role');

    if (user_logged !== 'usuario') {
      Swal.fire({
        title: 'Acceso denegado',
        text: 'Debes iniciar sesión como usuario para realizar la compra',
        icon: 'error',
        timer: 3000,
        showConfirmButton: false,
      }).then(() => {
        this.router.navigate(['/home']);
      })
      return;
    }

    this.carrito_usuario.forEach((producto: any) => {
      let precio = parseFloat(producto.precio);

      this.total_final += precio;

    });

  }

  eliminarProducto(id: number) {

    let producto = this.carrito_usuario.filtrarProducto(id);

    if (producto !== undefined) {
      Swal.fire({
        title: "¿Estas Seguro?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminarlo"
      }).then((result) => {
        if (result.isConfirmed){
          this.carrito_usuario.splice(producto, 1);
          localStorage.setItem('carrito', JSON.stringify(this.carrito_usuario));
        } Swal.fire({
          icon: "success",
          title: "Producto Eliminado",
          showConfirmButton: false,
          timer: 1500
        })
        location.reload();
      })

    }

  }

  limpiarCarrito() {
    localStorage.removeItem('carrito');
    location.reload();
  }

  irPago() {
    let pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');

    let nuevo_pedido = {
      id: pedidos.length + 1,
      username: sessionStorage.getItem('username'),
      fecha: new Date().toLocaleDateString(),
      total: this.total,
      estado: 'Pendiente'
    }

    pedidos.push(nuevo_pedido);

    localStorage.setItem('pedidos', JSON.stringify(pedidos));

    Swal.fire({
      title: 'Compra realizada con éxito',
      icon: 'success',
      timer: 3000,
      showConfirmButton: false,
    }).then(() => {
      localStorage.removeItem('carrito');
      this.router.navigate(['/home']);
    });
  }

}
