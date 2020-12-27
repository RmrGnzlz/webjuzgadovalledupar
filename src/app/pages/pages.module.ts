import { SharedModule } from './../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { UsuarioComponent } from './usuario/usuario.component';
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

const ngWizardConfig: NgWizardConfig = {
  theme: THEME.dots
};


@NgModule({
  declarations: [
    PagesComponent,
    UsuarioComponent,
    DashboardComponent,
    PruebaComponent,
    SalaComponent,
    DespachoComponent,
    JuzgadoComponent,
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
