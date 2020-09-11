import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { PagesComponent } from './pages.component';

const pagesRoute: Routes = [
{ path: 'page', component: PagesComponent},
{ path: 'usuario', component: UsuarioComponent}
]



@NgModule({

  imports: [RouterModule.forChild(pagesRoute)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
