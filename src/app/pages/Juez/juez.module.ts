import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './principal/principal.component';
import { JuezRoutingModule } from './juez.routing.module';



@NgModule({
  declarations: [PrincipalComponent],
  imports: [
    CommonModule,
    JuezRoutingModule
  ]
})
export class JuezModule { }
