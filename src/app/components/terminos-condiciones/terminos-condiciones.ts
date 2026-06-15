import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavbarComponent} from '../navbar/navbar';
import {Footer} from '../footer/footer';

@Component({
  selector: 'app-terminos-condiciones',
  imports: [
    RouterOutlet,
    NavbarComponent,
    Footer
  ],
  templateUrl: './terminos-condiciones.html',
  styleUrl: './terminos-condiciones.css',
})
export class TerminosCondiciones {}
