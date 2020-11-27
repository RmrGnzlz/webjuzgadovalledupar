import { SnotifyModule, SnotifyService,ToastDefaults } from 'ng-snotify';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DespachoComponent } from './despacho.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('DespachoComponent', () => {
  let component: DespachoComponent;
  let fixture: ComponentFixture<DespachoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DespachoComponent ],
      providers: [{ provide: 'SnotifyToastConfig', useValue: ToastDefaults }, SnotifyService],
      imports:[SnotifyModule,ReactiveFormsModule, HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DespachoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
