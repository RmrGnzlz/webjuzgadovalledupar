import { SharedModule } from './../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PruebaComponent } from './prueba/prueba.component';
import { SalaComponent } from './Tecnico/sala/sala.component';
import { ComponentsModule } from '../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DespachoComponent } from './tecnico/despacho/despacho.component';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { JuzgadoComponent } from './Tecnico/juzgado/juzgado.component';

import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';
import { RegistroEmpleadoComponent } from './Tecnico/empleado/registro-empleado/registro-empleado.component';
import { ListadoEmpleadoComponent } from './Tecnico/empleado/listado-empleado/listado-empleado.component';

const ngWizardConfig: NgWizardConfig = {
  theme: THEME.circles
};


@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    PruebaComponent,
    SalaComponent,
    DespachoComponent,
    JuzgadoComponent,
    RegistroEmpleadoComponent,
    ListadoEmpleadoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SnotifyModule.forRoot(),
    NgWizardModule.forRoot(ngWizardConfig)

  ],
  exports: [

  ],
  providers: [
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService
  ]
})
export class PagesModule { }
