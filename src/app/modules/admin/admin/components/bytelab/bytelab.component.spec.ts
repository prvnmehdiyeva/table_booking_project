import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BytelabComponent } from './bytelab.component';

describe('BytelabComponent', () => {
  let component: BytelabComponent;
  let fixture: ComponentFixture<BytelabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BytelabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BytelabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
