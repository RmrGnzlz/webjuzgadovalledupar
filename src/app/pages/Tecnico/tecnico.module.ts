import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TecnicoRoutingModule } from './tecnico-routing.module';
import { StringEnumPipe } from 'src/app/pipe/string-enum.pipe';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AsignacionJuzgadoComponent } from './asignacion-juzgado/asignacion-juzgado.component';
import { EdificioComponent } from './edificio/edificio.component';
import { ListadoEmpleadoComponent } from './empleado/listado-empleado/listado-empleado.component';
import { RegistroEmpleadoComponent } from './empleado/registro-empleado/registro-empleado.component';
import { JuzgadoComponent } from './juzgado/juzgado.component';
import { SalaComponent } from './sala/sala.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgWizardConfig, NgWizardModule, THEME } from 'ng-wizard';
import { ComponentsModule } from '../../components/components.module';
import { NgxSelectModule } from 'ngx-select-ex';
import { NgxPermissionsModule } from 'ngx-permissions';

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
    EdificioComponent,
    AsignacionJuzgadoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TecnicoRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
    NgWizardModule.forRoot(ngWizardConfig),
    NgxSelectModule,
    NgxPermissionsModule.forChild()
  ]
})
export class TecnicoModule { }
