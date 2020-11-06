
// RUTAS
import { AppRoutingModule } from './app-routing.module';


// MODULOS
import { PagesModule } from './pages/pages.module';
import { ServiceModule } from './Service/service.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


// COMPONENTES
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LoginComponent



  ],
  imports: [
    BrowserModule,
    PagesModule,
    AppRoutingModule,
    ServiceModule,
    BrowserAnimationsModule,

    // SharedModule
  ],
  exports: [

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
