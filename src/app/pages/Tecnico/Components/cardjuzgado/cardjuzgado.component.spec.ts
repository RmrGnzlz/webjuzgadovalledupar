import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardjuzgadoComponent } from './cardjuzgado.component';

describe('CardjuzgadoComponent', () => {
  let component: CardjuzgadoComponent;
  let fixture: ComponentFixture<CardjuzgadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardjuzgadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardjuzgadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
