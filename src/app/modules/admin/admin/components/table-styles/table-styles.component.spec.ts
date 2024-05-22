import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableStylesComponent } from './table-styles.component';

describe('TableStylesComponent', () => {
  let component: TableStylesComponent;
  let fixture: ComponentFixture<TableStylesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableStylesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableStylesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
