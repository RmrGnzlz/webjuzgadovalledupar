import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PrincipalComponent } from "./principal/principal.component";
import { EscribienteRoutingModule } from "./escribiente-routing.module";
import { ValidacionComponent } from "./validacion/validar/validacion.component";
import { ListadoComponent } from "./validacion/listado/listado.component";
import { ComponentsModule } from "src/app/components/components.module";
import { ListadoActaComponent } from "./GenerarActas/listado-acta/listado-acta.component";
import { ListadoRepartoComponent } from './GenerarReparto/listado-reparto/listado-reparto.component';
import { GenerarActaComponent } from './GenerarActas/generar/generarActa.component';
import { GenerarRepartoComponent } from './GenerarReparto/generar/generarReparto.component';

@NgModule({
  declarations: [
    PrincipalComponent,
    ValidacionComponent,
    ListadoComponent,
    ListadoActaComponent,
    ListadoRepartoComponent,
    GenerarActaComponent,
    GenerarRepartoComponent


  ],
  imports: [CommonModule, EscribienteRoutingModule, ComponentsModule],
})
export class EscribienteModule {}
