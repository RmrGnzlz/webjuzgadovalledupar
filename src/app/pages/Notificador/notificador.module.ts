import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './principal/principal.component';
import { NotificadorRoutingModule } from './notificador-routing.module';



@NgModule({
  declarations: [PrincipalComponent],
  imports: [
    CommonModule,
    NotificadorRoutingModule
  ]
})
export class NotificadorModule { }
