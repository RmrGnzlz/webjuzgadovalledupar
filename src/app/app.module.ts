import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// RUTAS
import { AppRoutingModule } from './app-routing.module';


// MODULOS
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
import { SolitudAnonimaComponent } from './solitud-anonima/Solicitar-solicitud/solitud-anonima.component';


import { NgWizardModule, NgWizardConfig, THEME, TOOLBAR_POSITION } from 'ng-wizard';
import { NgxMaskModule } from 'ngx-mask';
import { ConsultarSolicitudComponent } from './solitud-anonima/consultar-solicitud/consultar-solicitud.component';
import { InterceptorService } from './Service/Interceptors/interceptor.service';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';
import { PagesModule } from './pages/pages.module';
import { SnotifyModule, ToastDefaults, SnotifyService } from 'ng-snotify';

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
    PagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxMaskModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    SnotifyModule.forRoot(),
    RxReactiveFormsModule,
    NgWizardModule.forRoot(ngWizardConfig),
    SharedModule,
    ServiceModule,
    PagesModule,
  ],
  exports: [

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi:true
    },
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
