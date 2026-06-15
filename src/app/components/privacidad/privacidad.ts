import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavbarComponent} from '../navbar/navbar';
import {Footer} from '../footer/footer';

@Component({
  selector: 'app-privacidad',
  imports: [
    RouterOutlet,
    NavbarComponent,
    Footer
  ],
  templateUrl: './privacidad.html',
  styleUrl: './privacidad.css',
})
export class Privacidad {}
