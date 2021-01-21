import { NotFoundComponent } from './not-found/not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SolitudAnonimaComponent } from './solitud-anonima/solitud-anonima.component';
import { ConsultarSolicitudComponent } from './consultar-solicitud/consultar-solicitud.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'solicitudAnonima', component: SolitudAnonimaComponent },
  { path: 'ConsultaSolicitud', component: ConsultarSolicitudComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
