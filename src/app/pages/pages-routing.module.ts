import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PruebaComponent } from './prueba/prueba.component';

const pagesRoute: Routes = [
{ path: '',
 component: PagesComponent,
  children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'usuario', component: UsuarioComponent },
    { path: 'prueba', component: PruebaComponent },
    { path: '', pathMatch: 'full', redirectTo: '/dashboard' }
  ]
},

];



@NgModule({

  imports: [RouterModule.forChild(pagesRoute)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
