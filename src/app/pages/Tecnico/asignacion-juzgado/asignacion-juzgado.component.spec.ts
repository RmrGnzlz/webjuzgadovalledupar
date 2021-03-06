import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionJuzgadoComponent } from './asignacion-juzgado.component';

describe('AsignacionJuzgadoComponent', () => {
  let component: AsignacionJuzgadoComponent;
  let fixture: ComponentFixture<AsignacionJuzgadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignacionJuzgadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignacionJuzgadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
