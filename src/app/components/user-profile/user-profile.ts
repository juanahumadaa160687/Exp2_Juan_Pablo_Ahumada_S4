import {Component} from '@angular/core';
import {RouterOutlet, Router, ActivatedRoute} from '@angular/router';
import {NavbarComponent} from '../navbar/navbar';
import {Footer} from '../footer/footer';
import {NgOptimizedImage} from '@angular/common';
import Datatable from 'datatables.net-dt';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    Footer,
    NgOptimizedImage,
  ],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile{

  pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');
  users = JSON.parse(localStorage.getItem('users') || '[]');

  user_username = '';

  nombre = '';
  apellido = '';
  email = '';
  username = '';
  fecha_nacimiento = '';
  direccion = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {

    this.user_username = this.activatedRoute.snapshot.paramMap.get('username') || '';

    let user = this.users.filter((user: any) => user.username === this.user_username)[0] || {};

    this.nombre = user.nombre;
    this.apellido = user.apellido;
    this.email = user.email;
    this.username = user.username;
    this.fecha_nacimiento = user.fecha_nacimiento || 'Sin Información';
    this.direccion = user.direccion || 'Sin Dirección';

  }

  ngOnInit() {

    let table = new Datatable('#tablaPedidos', {
      paging: false,
      searching: false,
      responsive: true,
      columns: [
        {title: 'ID'},
        {title: 'Fecha'},
        {title: 'Total'},
        {title: 'Estado'},
      ],
      data:
        this.pedidos.map((pedido: any) => {
          return [
            pedido.id,
            pedido.fecha,
            pedido.total,
            pedido.estado,
          ]
        })
    });
  }

  deleteProfile() {

    this.users.splice(this.users.findIndex((user: any) => user.username === this.username), 1);

    localStorage.setItem('users', JSON.stringify(this.users));

    this.router.navigate(['/home']);

  }

  editProfile(event: MouseEvent) {

    this.router.navigate(['/edit_profile/' + this.username]);

  }

  cambiarPassword(event: MouseEvent) {

    this.router.navigate(['/change_password/' + this.email]);

  }


}
