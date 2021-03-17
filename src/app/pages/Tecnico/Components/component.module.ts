import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardjuzgadoComponent } from './cardjuzgado/cardjuzgado.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../../../components/components.module';



@NgModule({
  declarations: [
    CardjuzgadoComponent
  ],
  imports: [
    ComponentsModule,
  ],
  exports:[
    CardjuzgadoComponent,
    ComponentsModule

  ]
})
export class ComponentModule { }
