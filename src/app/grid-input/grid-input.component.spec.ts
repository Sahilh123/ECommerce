import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridInputComponent } from './grid-input.component';

describe('GridInputComponent', () => {
  let component: GridInputComponent;
  let fixture: ComponentFixture<GridInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GridInputComponent]
    });
    fixture = TestBed.createComponent(GridInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
