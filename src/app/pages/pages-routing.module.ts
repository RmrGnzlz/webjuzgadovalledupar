import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const pagesRoute: Routes = [
  {
    path:'tecnico',
    loadChildren:()=>import('./Tecnico/tecnico.module').then(m=>m.TecnicoModule)
  },
  {
    path:'escribiente',
    loadChildren:()=>import('./Escribiente/escribiente.module').then(m=>m.EscribienteModule)
  },
  {
    path:'fiscal',
    loadChildren:()=>import('./Fiscal/fiscal.module').then(m=>m.FiscalModule)
  },
  {
    path:'notificador',
    loadChildren:()=>import('./Notificador/notificador.module').then(m=>m.NotificadorModule)
  },
  {
    path:'juez',
    loadChildren:()=>import('./Juez/juez.module').then(m=>m.JuezModule)
  },
  {
    path:'coordinador',
    loadChildren:()=>import('./Coordinador/coordinador.module').then(m=>m.CoordinadorModule)
  }

  ]

@NgModule({

  imports: [RouterModule.forChild(pagesRoute)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
