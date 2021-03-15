import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';


const pagesRoute: Routes = [
  {
    path:'tecnico',
    loadChildren:()=>import('./Tecnico/tecnico.module').then(m=>m.TecnicoModule),
    canActivateChild:[NgxPermissionsGuard],
    data:{
      permissions: {
        only: ['tecnico','auditor'],
        redirectTo: '/Not-Found'

      }
    }

  },
  {
    path:'escribiente',
    loadChildren:()=>import('./Escribiente/escribiente.module').then(m=>m.EscribienteModule),
    canActivateChild:[NgxPermissionsGuard],
    data:{
      permissions: {
        only: 'escribiente',
        redirectTo: '/NotFound'

      }
    }

  },
  {
    path:'fiscal',
    loadChildren:()=>import('./Fiscal/fiscal.module').then(m=>m.FiscalModule),
    canActivateChild:[NgxPermissionsGuard],
    data:{
      permissions: {
        only: 'fiscal',
        redirectTo: '/NotFound'

      }
    }

  },
  {
    path:'notificador',
    loadChildren:()=>import('./Notificador/notificador.module').then(m=>m.NotificadorModule),
    canActivateChild:[NgxPermissionsGuard],
    data:{
      permissions: {
        only: 'notificador',
        redirectTo: '/NotFound'

      }
    }

  },
  {
    path:'juez',
    loadChildren:()=>import('./Juez/juez.module').then(m=>m.JuezModule),
    canActivateChild:[NgxPermissionsGuard],
    data:{
      permissions: {
        only: 'juez',
        redirectTo: '/NotFound'
      }
    }

  },
  {
    path:'coordinador',
    loadChildren:()=>import('./Coordinador/coordinador.module').then(m=>m.CoordinadorModule),
    canActivateChild:[NgxPermissionsGuard],
    data:{
      permissions: {
        only: 'coordinador',
        redirectTo: '/NotFound'

      }
    }
  },
  {
    path:'auditor',
    loadChildren:()=>import('./Auditor/auditor.module').then(m=>m.AuditorModule),
    canActivateChild:[NgxPermissionsGuard],
    data:{
      permissions: {
        only: ['auditor'],
        redirectTo: '/NotFound'

      }
    }
  }

  ]

@NgModule({

  imports: [RouterModule.forChild(pagesRoute)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
