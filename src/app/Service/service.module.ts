
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {
UsuarioService,
SalaService,
EdificioService
} from './service.index';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
  UsuarioService,
  SalaService,
  EdificioService
  ]
})
export class ServiceModule { }
