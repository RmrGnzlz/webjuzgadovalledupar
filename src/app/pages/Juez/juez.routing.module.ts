import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';

const JuezRoutes:Routes=[
{
  path:'',
  component:PrincipalComponent
}
]

@NgModule({

  imports: [RouterModule.forChild(JuezRoutes)],
  exports: [RouterModule]
})
export class JuezRoutingModule { }
