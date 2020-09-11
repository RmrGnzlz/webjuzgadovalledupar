import { PagesModule } from './pages/pages.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [
{ path: '', component: PagesComponent },
{ path: 'login', component: LoginComponent },

// {
// path: '',
// component: PagesComponent,
// loadChildren: './pages/PagesModule#pagesModule'
// },

{ path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
