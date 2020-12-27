import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolitudAnonimaComponent } from './solitud-anonima.component';

describe('SolitudAnonimaComponent', () => {
  let component: SolitudAnonimaComponent;
  let fixture: ComponentFixture<SolitudAnonimaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolitudAnonimaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolitudAnonimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
