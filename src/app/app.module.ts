import { HttpClientModule } from '@angular/common/http';

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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';





@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LoginComponent



  ],
  imports: [
    FormsModule,
    BrowserModule,
    PagesModule,
    AppRoutingModule,
    ServiceModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // ToastrModule.forRoot({
    //   timeOut:100,
    //   progressBar:true,
    //   progressAnimation: 'increasing',
    //   preventDuplicates: true,
    //   countDuplicates: true

    // }),
    SnotifyModule
    // ReactiveFormsModule

    // SharedModule
  ],
  exports: [

  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
