import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiscalRoutingModule } from './fiscal-routing.module';
import { PrincipalComponent } from './principal/principal.component';



@NgModule({
  declarations: [PrincipalComponent],
  imports: [
    CommonModule,
    FiscalRoutingModule
  ]
})
export class FiscalModule { }
