import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { ValidacionComponent } from './validacion/validacion.component';

const EscribienteRoutes:Routes=[
{
  path:'',
  component:PrincipalComponent
},
{
  path:'validacion',
  component:ValidacionComponent
}
]

@NgModule({

  imports: [RouterModule.forChild(EscribienteRoutes)],
  exports: [RouterModule]
})
export class EscribienteRoutingModule { }
