import { Component, ElementRef, OnInit, ViewChild,AfterViewInit, Renderer2 } from '@angular/core';
@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent {
  @ViewChild('counters') counters!: ElementRef;
  @ViewChild('otherr') otherr!: ElementRef;
  @ViewChild('aother') aother!: ElementRef;

  constructor(
    private renderer: Renderer2
  )
  {}
  ngAfterViewInit(): void {
    // if (this.counters) {
    //   const initialValue = parseInt(this.counters.nativeElement.innerText);
    //   this.animateCounter(this.counters.nativeElement, initialValue);
    // }
    if (this.otherr) {
      const initialValue = parseInt(this.otherr.nativeElement.innerText);
      this.animateCounter(this.otherr.nativeElement, initialValue);
    }
    if (this.aother) {
      const initialValue = parseInt(this.aother.nativeElement.innerText);
      this.animateCounter(this.aother.nativeElement, initialValue);
    }
  }

  private animateCounter(element: HTMLElement, initialValue: number): void {
    let start = 0;
    let end = initialValue;
    const duration = 0;
    const range = end - start;
    let current = start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));

    const timer = setInterval(() => {
      current += increment;
      this.renderer.setProperty(element, 'innerText', Math.ceil(current).toString());
      if (current === end) {
        clearInterval(timer);
      }
    }, 0.1 );
  }
}
