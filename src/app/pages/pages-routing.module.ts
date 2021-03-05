import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SalaComponent } from './Tecnico/sala/sala.component';
import { JuzgadoComponent } from './Tecnico/juzgado/juzgado.component';
import { ListadoEmpleadoComponent } from './Tecnico/empleado/listado-empleado/listado-empleado.component';
import { RegistroEmpleadoComponent } from './Tecnico/empleado/registro-empleado/registro-empleado.component';
import { EdificioComponent } from './Tecnico/edificio/edificio.component';

const pagesRoute: Routes = [
// { path: '',
//  component: PagesComponent,
//   children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'sala', component: SalaComponent },
    { path: 'empleados', component: ListadoEmpleadoComponent  },
    { path: 'empleado', component: RegistroEmpleadoComponent  },
    { path: 'juzgado', component: JuzgadoComponent },
    { path: 'edificio', component: EdificioComponent },
    { path: '', pathMatch: 'full', redirectTo: '/dashboard' }
  ]
// },

// ];



@NgModule({

  imports: [RouterModule.forChild(pagesRoute)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
