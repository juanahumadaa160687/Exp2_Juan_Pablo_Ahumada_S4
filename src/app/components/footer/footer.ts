import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [
    NgOptimizedImage,
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {

  year : string = new Date().getFullYear().toString();

  constructor(private router: RouterOutlet) {}

}
