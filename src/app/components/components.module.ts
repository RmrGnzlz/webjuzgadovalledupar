import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaComponentComponent } from './tabla-component/tabla-component.component';
import { TablaComponent } from './tabla/tabla.component';
import { TableModule } from 'ngx-easy-table';



@NgModule({
  declarations: [
    TablaComponentComponent,
    TablaComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
  ],
  exports: [
    TablaComponentComponent,
    TablaComponent
  ]
})
export class ComponentsModule { }
