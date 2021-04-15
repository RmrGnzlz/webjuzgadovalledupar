import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EdificioComponent } from './edificio/edificio.component';
import { ListadoEmpleadoComponent } from './empleado/listado-empleado/listado-empleado.component';
import { RegistroEmpleadoComponent } from './empleado/registro-empleado/registro-empleado.component';
import { JuzgadoComponent } from './juzgado/juzgado.component';
import { SalaComponent } from './sala/sala.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AsignacionJuzgadoComponent } from './asignacion-juzgado/asignacion-juzgado.component';
import { NgxPermissionsGuard } from 'ngx-permissions';


const TecnicoRoute: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },

  {
    path: 'sala',
    children: [
      {
        path: '', component: SalaComponent,
        canActivateChild: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: '',
            redirectTo: '/Not-Found'
          }
        }
      }
    ]
  },
  {
    path: 'empleado',
    children: [
      {
        path: '', component: ListadoEmpleadoComponent,
        canActivateChild: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: '',
            redirectTo: '/Not-Found'
          }
        }
      },
      {
        path: 'registrar', component: RegistroEmpleadoComponent,
        canActivateChild: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: '',
            redirectTo: '/tecnico'

          }
        }
      },
      { path: '**', redirectTo: 'empleado' }
    ]
  },

  {
    path: 'juzgado',
    children: [
      {
        path: '', component: JuzgadoComponent,
        canActivateChild: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: '',
            redirectTo: '/Not-Found'
          }
        }
      },
      {
        path: 'asignar', component: AsignacionJuzgadoComponent,
        canActivateChild: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: '',
            redirectTo: '/Not-Found'

          }
        }
      },
      { path: '**', redirectTo: 'juzgado' }
    ]
  },
  {
    path: 'edificio', component: EdificioComponent,
    canActivateChild: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: '',
        redirectTo: '/Not-Found'

      }
    }
  },



]

@NgModule({
  imports: [RouterModule.forChild(TecnicoRoute)],
  exports: [RouterModule]
})
export class TecnicoRoutingModule { }
