import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EdificioComponent } from './edificio/edificio.component';
import { ListadoEmpleadoComponent } from './empleado/listado-empleado/listado-empleado.component';
import { RegistroEmpleadoComponent } from './empleado/registro-empleado/registro-empleado.component';
import { JuzgadoComponent } from './juzgado/juzgado.component';
import { SalaComponent } from './sala/sala.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AsignacionJuzgadoComponent } from './asignacion-juzgado/asignacion-juzgado.component';


const TecnicoRoute: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'sala', component: SalaComponent },
  {
    path: 'empleado',
    children: [
      { path: 'regitrar', component: RegistroEmpleadoComponent },
      { path: 'listar', component: ListadoEmpleadoComponent },
      { path: '**', redirectTo: 'listar' }
    ]
  },
  {
    path: 'juzgado',
    children: [
      { path: 'listar', component: JuzgadoComponent },
      { path: 'asignar', component: AsignacionJuzgadoComponent }
    ]
  },
  { path: 'edificio', component: EdificioComponent },



]

@NgModule({
  imports: [RouterModule.forChild(TecnicoRoute)],
  exports: [RouterModule]
})
export class TecnicoRoutingModule { }
