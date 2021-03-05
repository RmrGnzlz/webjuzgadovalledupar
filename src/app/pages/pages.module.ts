import { PagesRoutingModule } from './pages-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { DashboardComponent } from './dashboard/dashboard.component';
import { SalaComponent } from './Tecnico/sala/sala.component';
import { ComponentsModule } from '../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';
import { RegistroEmpleadoComponent } from './Tecnico/empleado/registro-empleado/registro-empleado.component';
import { ListadoEmpleadoComponent } from './Tecnico/empleado/listado-empleado/listado-empleado.component';
import { StringEnumPipe } from '../pipe/string-enum.pipe';
import { NgxSelectModule } from 'ngx-select-ex';
import { EdificioComponent } from './Tecnico/edificio/edificio.component';
import { JuzgadoComponent } from './Tecnico/juzgado/juzgado.component';

const ngWizardConfig: NgWizardConfig = {
  theme: THEME.circles
};


@NgModule({
  declarations: [
    DashboardComponent,
    SalaComponent,
    JuzgadoComponent,
    RegistroEmpleadoComponent,
    ListadoEmpleadoComponent,
    StringEnumPipe,
    EdificioComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgWizardModule.forRoot(ngWizardConfig),
    NgxSelectModule




  ]
})
export class PagesModule { }
