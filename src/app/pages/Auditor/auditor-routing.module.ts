import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';

const auditorRoutes:Routes=[
{
path:'',
component:PrincipalComponent
}
]

@NgModule({

  imports: [RouterModule.forChild(auditorRoutes)],
  exports: [RouterModule]
})
export class AuditorRoutingModule { }
