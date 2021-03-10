import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';


const pagesRoute: Routes = [
  {
    path:'tecnico',
    loadChildren:()=>import('./Tecnico/tecnico.module').then(m=>m.TecnicoModule),
    // canActivate:[NgxPermissionsGuard],
    // data:{
    //   Permissions:{
    //     only: 'ADMIN'
    //   }
    // }
  },
  {
    path:'escribiente',
    loadChildren:()=>import('./Escribiente/escribiente.module').then(m=>m.EscribienteModule),
    // data:{
    //   Permissions:{
    //     only: 'ADMIN'
    //   }
    // }
  },
  {
    path:'fiscal',
    loadChildren:()=>import('./Fiscal/fiscal.module').then(m=>m.FiscalModule),
    // data:{
    //   Permissions:{
    //     only: 'ADMIN'
    //   }
    // }

  },
  {
    path:'notificador',
    loadChildren:()=>import('./Notificador/notificador.module').then(m=>m.NotificadorModule),
    // data:{
    //   Permissions:{
    //     only: 'ADMIN'
    //   }
    // }
  },
  {
    path:'juez',
    loadChildren:()=>import('./Juez/juez.module').then(m=>m.JuezModule),
    // data:{
    //   Permissions:{
    //     only: 'ADMIN'
    //   }
    // }
  },
  {
    path:'coordinador',
    loadChildren:()=>import('./Coordinador/coordinador.module').then(m=>m.CoordinadorModule),
    // data:{
    //   Permissions:{
    //     only: 'ADMIN'
    //   }
    // }
  },
  {
    path:'auditor',
    loadChildren:()=>import('./Auditor/auditor.module').then(m=>m.AuditorModule),
    // data:{
    //   Permissions:{
    //     only: 'ADMIN'
    //   }
    // }
  }

  ]

@NgModule({

  imports: [RouterModule.forChild(pagesRoute)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
