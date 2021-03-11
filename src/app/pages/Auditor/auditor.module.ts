import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './principal/principal.component';
import { AuditorRoutingModule } from './auditor-routing.module';
import { NgxPermissionsModule } from 'ngx-permissions';



@NgModule({
  declarations: [PrincipalComponent],
  imports: [
    CommonModule,
    AuditorRoutingModule,
    NgxPermissionsModule.forChild()
  ]
})
export class AuditorModule { }
