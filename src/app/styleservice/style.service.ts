import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StyleService {
  private selectedStyleSubject: BehaviorSubject<string> = new BehaviorSubject<string>('styleSingle4');

  selectedStyle$ = this.selectedStyleSubject.asObservable();

  constructor() {
    const storedStyle = sessionStorage.getItem('selectedStyle');
    if (storedStyle) {
      this.selectedStyleSubject.next(storedStyle);
    }
  }

  setSelectedStyle(style: string) {
    this.selectedStyleSubject.next(style);
    sessionStorage.setItem('selectedStyle', style);
  }
}
