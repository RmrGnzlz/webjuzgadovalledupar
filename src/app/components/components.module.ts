import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaComponent } from './tabla/tabla.component';
import { TableModule } from 'ngx-easy-table';
import { ModalAuthComponent } from './modal-auth/modal-auth.component';



@NgModule({
  declarations: [
    TablaComponent,
  ],
  imports: [
    CommonModule,
    TableModule,

  ],
  exports: [
    TablaComponent,
    TableModule,
  ]
})
export class ComponentsModule { }
