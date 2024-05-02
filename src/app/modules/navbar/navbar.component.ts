import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(

    @Inject(DOCUMENT) public document: Document,

  ) {}
  toggleDarkMode() {
    if (this.document.body.classList.contains('dark')) {
      this.document.body.classList.remove('dark');
    } else {
      this.document.body.classList.add('dark');
    }
    }
}
