import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SalaComponent } from './Tecnico/sala/sala.component';

const pagesRoute: Routes = [
{ path: '',
 component: PagesComponent,
  children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'usuario', component: UsuarioComponent },
    { path: 'sala', component: SalaComponent },
    { path: '', pathMatch: 'full', redirectTo: '/dashboard' }
  ]
},

];



@NgModule({

  imports: [RouterModule.forChild(pagesRoute)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
