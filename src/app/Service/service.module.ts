import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {
UsuarioService
} from './service.index';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
  UsuarioService
  ]
})
export class ServiceModule { }
