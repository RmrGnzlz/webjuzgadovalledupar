import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './principal/principal.component';
import { EscribienteRoutingModule } from './escribiente-routing.module';
import { ValidacionComponent } from './validacion/validar/validacion.component';
import { ListadoComponent } from './validacion/listado/listado.component';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  declarations: [PrincipalComponent, ValidacionComponent, ListadoComponent],
  imports: [
    CommonModule,
    EscribienteRoutingModule,
    ComponentsModule
  ]
})
export class EscribienteModule { }
