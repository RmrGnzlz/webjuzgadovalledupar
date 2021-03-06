import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './principal/principal.component';
import { EscribienteRoutingModule } from './escribiente-routing.module';
import { ValidacionComponent } from './validacion/validacion.component';



@NgModule({
  declarations: [PrincipalComponent, ValidacionComponent],
  imports: [
    CommonModule,
    EscribienteRoutingModule
  ]
})
export class EscribienteModule { }
