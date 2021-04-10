import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';

const CoordinadorRoutes:Routes=[
{
  path:'',
  component	:PrincipalComponent
}
]

@NgModule({
  imports: [RouterModule.forChild(CoordinadorRoutes)],
  exports: [RouterModule]
})
export class CoordinadorRoutingModule { }
