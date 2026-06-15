import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavbarComponent} from '../navbar/navbar';
import {Footer} from '../footer/footer';

@Component({
  selector: 'app-ofertas',
  imports: [
    RouterOutlet,
    NavbarComponent,
    Footer
  ],
  templateUrl: './ofertas.html',
  styleUrl: './ofertas.css',
})
export class Ofertas {}
