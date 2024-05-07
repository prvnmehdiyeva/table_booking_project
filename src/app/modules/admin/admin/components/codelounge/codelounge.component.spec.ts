import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeloungeComponent } from './codelounge.component';

describe('CodeloungeComponent', () => {
  let component: CodeloungeComponent;
  let fixture: ComponentFixture<CodeloungeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CodeloungeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CodeloungeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
