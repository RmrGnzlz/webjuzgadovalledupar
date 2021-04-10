import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';


const FiscalRoutes: Routes=[
{
  path:'',
  component:PrincipalComponent
}
]

@NgModule({

  imports: [RouterModule.forChild(FiscalRoutes)],
  exports: [RouterModule]
})

export class FiscalRoutingModule { }
