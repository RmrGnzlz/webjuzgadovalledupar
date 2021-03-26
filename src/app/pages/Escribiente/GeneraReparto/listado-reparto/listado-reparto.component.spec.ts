import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoRepartoComponent } from './listado-reparto.component';

describe('ListadoRepartoComponent', () => {
  let component: ListadoRepartoComponent;
  let fixture: ComponentFixture<ListadoRepartoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoRepartoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoRepartoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
