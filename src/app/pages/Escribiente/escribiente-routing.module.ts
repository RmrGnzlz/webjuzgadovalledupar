import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { ListadoActaComponent } from './GenerarActas/listado-acta/listado-acta.component';
import { PrincipalComponent } from './principal/principal.component';
import { ListadoComponent } from './validacion/listado/listado.component';
import { ValidacionComponent } from './validacion/validar/validacion.component';
import { ListadoRepartoComponent } from './GeneraReparto/listado-reparto/listado-reparto.component';

const EscribienteRoutes:Routes=[
{
  path:'',
  component:PrincipalComponent
},
{
  path:'solicitud',
  children:[
    {
    path:'',
    component:ListadoComponent,
    canActivateChild: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: '',
        redirectTo: '/Not-Found'
      }
    }
    },
    {
      path:'validar',
      component:ValidacionComponent,
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
  path:'actas',
  children:[
    {
      path:'',
      component:ListadoActaComponent,
      data: {
        permissions: {
          only: '',
          redirectTo: '/Not-Found'
        }
      }
    },

  ]
},
{
  path:'reparto',
  children:[
    {path:'',
    component:ListadoRepartoComponent,
    data: {
      permissions: {
        only: '',
        redirectTo: '/Not-Found'
      }
    }
    }
  ]
}


]

@NgModule({

  imports: [RouterModule.forChild(EscribienteRoutes)],
  exports: [RouterModule]
})
export class EscribienteRoutingModule { }
