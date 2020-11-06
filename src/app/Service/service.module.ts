
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {
UsuarioService,
SalaService
} from './service.index';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
  UsuarioService,
  SalaService
  ]
})
export class ServiceModule { }
