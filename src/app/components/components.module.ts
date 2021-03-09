import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaComponent } from './tabla/tabla.component';
import { TableModule } from 'ngx-easy-table';



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
