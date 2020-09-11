import { SharedModule } from './../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioComponent } from './usuario/usuario.component';
import { PagesComponent } from './pages.component';



@NgModule({
  declarations: [
    UsuarioComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PagesRoutingModule
  ],
  exports: [

  ]
})
export class PagesModule { }
