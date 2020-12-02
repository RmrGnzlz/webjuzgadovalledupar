import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaComponent } from './sala.component';
import { SnotifyService, ToastDefaults } from 'ng-snotify';

describe('SalaComponent', () => {
  let component: SalaComponent;
  let fixture: ComponentFixture<SalaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaComponent ],
      imports:[HttpClientModule, ReactiveFormsModule],
      providers: [{ provide: 'SnotifyToastConfig', useValue: ToastDefaults }, SnotifyService],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
