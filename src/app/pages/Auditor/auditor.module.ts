import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './principal/principal.component';
import { AuditorRoutingModule } from './auditor-routing.module';



@NgModule({
  declarations: [PrincipalComponent],
  imports: [
    CommonModule,
    AuditorRoutingModule
  ]
})
export class AuditorModule { }
