import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SalaComponent } from './Tecnico/sala/sala.component';
import { DespachoComponent } from './tecnico/despacho/despacho.component';
import { JuzgadoComponent } from './Tecnico/juzgado/juzgado.component';

const pagesRoute: Routes = [
{ path: '',
 component: PagesComponent,
  children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'usuario', component: UsuarioComponent },
    { path: 'sala', component: SalaComponent },
    { path: 'despacho', component: DespachoComponent },
    { path: 'juzgado', component: JuzgadoComponent },
    { path: '', pathMatch: 'full', redirectTo: '/dashboard' }
  ]
},

];



@NgModule({

  imports: [RouterModule.forChild(pagesRoute)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
