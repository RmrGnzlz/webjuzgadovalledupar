import { SharedModule } from './../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioComponent } from './usuario/usuario.component';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PruebaComponent } from './prueba/prueba.component';
import { SalaComponent } from './Tecnico/sala/sala.component';
import { MaterialModule } from '../material.module';
import { ComponentsModule } from '../components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DespachoComponent } from './tecnico/despacho/despacho.component';


@NgModule({
  declarations: [
    PagesComponent,
    UsuarioComponent,
    DashboardComponent,
    PruebaComponent,
    SalaComponent,
    DespachoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PagesRoutingModule,
    MaterialModule,
    ComponentsModule,
    ReactiveFormsModule

  ],
  exports: [
    UsuarioComponent,
    DashboardComponent
  ]
})
export class PagesModule { }
