import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardjuzgadoComponent } from './cardjuzgado/cardjuzgado.component';



@NgModule({
  declarations: [
    CardjuzgadoComponent
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    CardjuzgadoComponent
  ]
})
export class ComponentModule { }
