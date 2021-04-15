
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {
UsuarioService,
SalaService,
EdificioService,
ServicieGeneric,
} from './service.index';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

  ],
  exports:[

  ],
  providers:[
  UsuarioService,
  SalaService,
  EdificioService,
  ServicieGeneric,

  ]
})
export class ServiceModule { }
