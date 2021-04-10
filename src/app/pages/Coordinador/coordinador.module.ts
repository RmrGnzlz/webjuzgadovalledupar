import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './principal/principal.component';
import { CoordinadorRoutingModule } from './coordinador-routing.module';



@NgModule({
  declarations: [PrincipalComponent],
  imports: [
    CommonModule,
    CoordinadorRoutingModule
  ]
})
export class CoordinadorModule { }
