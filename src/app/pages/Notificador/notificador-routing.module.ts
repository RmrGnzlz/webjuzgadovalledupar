import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';

const NotificadorRoutes: Routes=[
{
  path:'',
  component:PrincipalComponent
}

]
@NgModule({

  imports: [RouterModule.forChild(NotificadorRoutes)],
  exports: [RouterModule]
})
export class NotificadorRoutingModule { }
