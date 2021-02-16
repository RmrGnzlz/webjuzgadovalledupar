
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {
UsuarioService,
SalaService,
EdificioService,
ServicieGeneric,
NotificacionServiceService
} from './service.index';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SnotifyModule.forRoot(),
  ],
  exports:[
    SnotifyModule,
  ],
  providers:[
  UsuarioService,
  SalaService,
  EdificioService,
  ServicieGeneric,
  NotificacionServiceService,
  { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
  SnotifyService
  ]
})
export class ServiceModule { }
