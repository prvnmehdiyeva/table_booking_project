import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent implements OnInit {
  lastSegment!: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getLastSegment();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.getLastSegment();
    });
  }

  getLastSegment(): void {
    const segments = this.router.url.split('/');
    this.lastSegment = segments[segments.length - 1];
    this.lastSegment = this.capitalizeFirstLetter(this.lastSegment);

  }
  capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
