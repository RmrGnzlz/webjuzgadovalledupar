import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaComponentComponent } from './tabla-component/tabla-component.component';



@NgModule({
  declarations: [
    TablaComponentComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    TablaComponentComponent,
  ]
})
export class ComponentsModule { }
