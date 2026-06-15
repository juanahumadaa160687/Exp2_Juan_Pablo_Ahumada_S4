import { Component } from '@angular/core';
import {RouterOutlet, Router} from '@angular/router';
import {NavbarComponent} from '../navbar/navbar';
import {Footer} from '../footer/footer';
import Swal from 'sweetalert2';
import Datatable from 'datatables.net-dt'
import 'datatables.net-responsive-dt'
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    Footer,
    FormsModule,
  ],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {

  productos: any = JSON.parse(localStorage.getItem('productos') || '[]');

  nombre: string = '';
  apellido: string = '';
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  role: string = 'admin';

  id_producto: number = 0;
  nombre_producto: string = '';
  categoria_producto: string = '';
  precio_producto: number = 0;
  stock_producto: number = 0;
  imagen_producto: string = '';
  destacado: boolean = false;
  descripcion_producto: string = '';

  constructor(private router: Router) {

  }

  ngOnInit() {

    let user_role = sessionStorage.getItem('role');

    if (user_role !== 'admin') {
      Swal.fire({
        icon: 'warning',
        title: 'Acceso denegado',
        text: 'No tienes permiso para acceder a esta página',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        this.router.navigate(['/home']);
      })
    }

    let table = new Datatable('#adminTable', {
      responsive: true,
      searching: false,
      paging: false,
      columns: [
        {title: 'ID'},
        {title: 'Nombre'},
        {title: 'Categoria'},
        {title: 'Descripcion'},
        {title: 'Precio'},
        {title: 'Stock'},
        {title: 'Acciones'},
      ],
      data:
        this.productos.map((item: any) => {
          return [
            item.id,
            item.nombre,
            item.categoria,
            item.descripcion,
            item.precio,
            item.stock,
            `<button class="btn btn-danger" id="bt_eliminar" onclick="this.deleteProd(item.id)"><i class="bi bi-trash-fill"></i></button>`,

          ]
        })
    });
  }

  deleteProd(id: number) {
    let producto_borrar = this.productos.filter((producto: any) => producto.id === id);

    this.productos.splice(this.productos.indexOf(producto_borrar), 1);

    localStorage.setItem('productos', JSON.stringify(this.productos));

    Swal.fire({
      icon: 'success',
      title: 'Producto eliminado',
      text: 'El producto ha sido eliminado correctamente',
      confirmButtonText: 'Aceptar'
    }).then(() => {
      location.reload();
    });
  }

  submitFormAdmin(event: MouseEvent) {
    event.preventDefault();

    let users = JSON.parse(localStorage.getItem('users') || '[]');

    let users_username = users.filter((user: any) => user.username === this.username);
    let users_email = users.filter((user: any) => user.email === this.email);

    let nombre_feedback = document.getElementById('name_feedback') as HTMLDivElement;
    let apellido_feedback = document.getElementById('lastname_feedback') as HTMLDivElement;
    let username_feedback = document.getElementById('userName_feedback') as HTMLDivElement;
    let email_feedback = document.getElementById('correo_feedback') as HTMLDivElement;
    let password_feedback = document.getElementById('contrasena_feedback') as HTMLDivElement;
    let confirm_feedback = document.getElementById('confirmContrasena_feedback') as HTMLDivElement;

   if (this.nombre === '') {
     nombre_feedback.innerText = 'El nombre es obligatorio';
     nombre_feedback.style.display = 'block';

     setTimeout(() => {
       nombre_feedback.style.display = 'none';
     }, 3500);
     return;
   }
   else if (this.apellido === '') {
     apellido_feedback.innerText = 'El apellido es obligatorio';
     nombre_feedback.style.display = 'block';

     setTimeout(() => {
       apellido_feedback.style.display = 'none';
     }, 3500);
     return;
   }
   else if (this.username === '') {
     username_feedback.innerText = 'El username es obligatorio';
     username_feedback.style.display = 'block';

     setTimeout(() => {
       username_feedback.style.display = 'none';
     }, 3500);
     return;
   }
   else if (users_username) {
     username_feedback.innerText = 'El username ya existe';
     username_feedback.style.display = 'block';

     setTimeout(() => {
       username_feedback.style.display = 'none';
     }, 3500);
     return;
   }
    else if (this.email === '') {
      email_feedback.innerText = 'El email es obligatorio';
      email_feedback.style.display = 'block';

      setTimeout(() => {
        email_feedback.style.display = 'none';
      }, 3500);
      return;
   }
    else if (users_email) {
      email_feedback.innerText = 'El email ya existe';
      email_feedback.style.display = 'block';

      setTimeout(() => {
        email_feedback.style.display = 'none';
      }, 3500);
     return;
   }
    else if (this.email.includes('@') && this.email.includes('.')) {
      email_feedback.innerText = 'Email no valido';
      email_feedback.style.display = 'block';

      setTimeout(() => {
        email_feedback.style.display = 'none';
      }, 3500);
   }
    else if (this.password === '' || !this.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
     password_feedback.innerText = 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial (@$!%*?&)';
     password_feedback.style.display = 'block';

     setTimeout(() => {
       password_feedback.style.display = 'none';
     }, 3500);
     return;
   }
    else if (this.confirmPassword === '' || this.password !== this.confirmPassword) {
     confirm_feedback.innerText = 'Las contraseñas no coinciden';
     confirm_feedback.style.display = 'block';

     setTimeout(() => {
       confirm_feedback.style.display = 'none';
     }, 3500);
     return;
   }

    users.push({
      nombre: this.nombre,
      apellido: this.apellido,
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role,
    });

    localStorage.setItem('users', JSON.stringify(users));

    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: 'El administrador ha sido creado correctamente',
      confirmButtonText: 'Aceptar'
    }).then(() => {
      location.reload();
    });
  }

  submitFormProducto(event: MouseEvent) {
    event.preventDefault();
    let productos = JSON.parse(localStorage.getItem('productos') || '[]');
    let producto_ex = productos.filter((producto: any) => producto.id === this.id_producto);

    if (producto_ex) {

      let producto = {
        id: this.id_producto,
        nombre: this.nombre_producto,
        categoria: this.categoria_producto,
        precio: this.precio_producto,
        stock: this.stock_producto,
        imagen: this.imagen_producto,
        destacado: this.destacado,
        descripcion: this.descripcion_producto,
      }

      productos.push(producto);
      localStorage.setItem('productos', JSON.stringify(productos));

      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'El producto ha sido creado correctamente',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        location.reload();
      });
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops... Algo salió mal',
        text: 'El producto ya existe',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        location.reload();
      });
    }
  }
}
