import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoActaComponent } from './listado-acta.component';

describe('ListadoActaComponent', () => {
  let component: ListadoActaComponent;
  let fixture: ComponentFixture<ListadoActaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoActaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoActaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
