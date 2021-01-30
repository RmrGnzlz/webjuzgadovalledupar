import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { SolitudAnonimaComponent } from './solitud-anonima/solitud-anonima.component';


import { NgWizardModule, NgWizardConfig, THEME, TOOLBAR_POSITION } from 'ng-wizard';
import { SnotifyModule } from 'ng-snotify';
import { NgxMaskModule } from 'ngx-mask';
import { ConsultarSolicitudComponent } from './consultar-solicitud/consultar-solicitud.component';
import { InterceptorService } from './Service/Interceptors/interceptor.service';

const ngWizardConfig: NgWizardConfig = {
  theme: THEME.circles,
  lang: {
    next: "Siguiente",
    previous:"Anterior"
  },
};



@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LoginComponent,
    SolitudAnonimaComponent,
    ConsultarSolicitudComponent,
  ],
  imports: [
    BrowserModule,
    PagesModule,
    AppRoutingModule,
    ServiceModule,
    NgxMaskModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RxReactiveFormsModule,
    NgWizardModule.forRoot(ngWizardConfig),
    SnotifyModule.forRoot(),

    // SharedModule
  ],
  exports: [

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
