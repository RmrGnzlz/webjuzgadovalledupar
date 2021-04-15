import { NotFoundComponent } from './not-found/not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SolitudAnonimaComponent } from './solitud-anonima/Solicitar-solicitud/solitud-anonima.component';
import { ConsultarSolicitudComponent } from './solitud-anonima/consultar-solicitud/consultar-solicitud.component';
import { LoginComponent } from './login/login.component';
import { PagesComponent } from './pages/pages.component';
import { AuthGuard } from './Service/guards/auth.guard';
import { NgxPermissionsGuard } from 'ngx-permissions';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: '', component: LoginComponent },
  { path: 'solicitudAnonima', component: SolitudAnonimaComponent },
  { path: 'ConsultaSolicitud', component: ConsultarSolicitudComponent },
  {
    path:'',
    component:PagesComponent,
    loadChildren:()=>import('./pages/pages.module').then(m=>m.PagesModule),
    canActivate:[AuthGuard],

  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
