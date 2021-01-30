import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StepChangedArgs, StepValidationArgs, STEP_STATE } from 'ng-wizard';
import { of } from 'rxjs';
import { TipoDocumentos } from 'src/app/models/Enums/DocumentosValidosEnum';
import { ServicieGeneric } from 'src/app/Service/service.index';
import { NotificacionServiceService } from 'src/app/utils/notificacion-service.service';
import { Router } from '@angular/router';
import { ResponseHttp } from 'src/app/models/Base/ResponseHttp';
import { Empleado } from 'src/app/models/Enpleado';
import { Persona } from 'src/app/models/Persona';

@Component({
  selector: 'app-registro-empleado',
  templateUrl: './registro-empleado.component.html',
  styleUrls: ['./registro-empleado.component.css']
})
export class RegistroEmpleadoComponent implements OnInit {

  @ViewChild('personaForm', { static: false }) personaForm: NgForm;
  @ViewChild('empleadoForm', { static: false }) empleadoForm: NgForm;
  @ViewChild('documentoForm', { static: false }) documentoForm: NgForm;
  persona = new Persona();
  empleado = new Empleado();
  nombresYapellidos: string[] = ["", "", "", ""];
  tipoDocumentos: any[] = [];
  existePersona = false;

  constructor(private notificacion: NotificacionServiceService,
    private _ServiceGeneric: ServicieGeneric,
    private router: Router,) { }

  ngOnInit(): void {
  }

  loadEnums() {
    for (const item in TipoDocumentos) {
      if (isNaN(Number(item))) {
        this.tipoDocumentos.push({ nombre: item, key: TipoDocumentos[item] });
      }
    }
  }

  validarFormularioYRegistrar() {
    if (this.documentoForm.invalid || this.personaForm.invalid || (this.documentoForm.value['documento'] != this.persona.numeroDocumento)) {
      this.notificacion.MensajeError("Anomalia en el formulario", "Intente nuevamente")
      return;
    }

    if (this.empleadoForm.invalid) {
      this.notificacion.MensajeError("Formulario invalido", "Error");
      return;
    }
  }

  consultarPersona() {
    this._ServiceGeneric.getRemove<ResponseHttp<Persona>>(this.persona.numeroDocumento, `persona`)
      .subscribe(res => {
        this.persona = res.data as Persona;
        this.existePersona = true;

      });
  }

  actualizarOAgregarPersona() {
    var metodo: any = 'post'
    if (this.existePersona) metodo = 'Put'
    this._ServiceGeneric.postPatch<ResponseHttp<Persona>>(`persona`, this.persona, null, metodo)
      .subscribe(res =>
        this.notificacion.MensajeSuccess(res.message)
      );
  }

  registrarEmpleado() {
    this._ServiceGeneric.postPatch<ResponseHttp<Empleado>>(`empleado`, this.empleado)
      .subscribe(res => {
        this.notificacion.MensajeSuccess(res.message);
        this.router.navigate(['/empleados']);
      });
  }


  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }


  stepStates = {
    normal: STEP_STATE.normal,
    disabled: STEP_STATE.disabled,
    error: STEP_STATE.error,
    hidden: STEP_STATE.hidden
  };
  isValidTypeBoolean: boolean = true;

  stepChanged(args: StepChangedArgs) {
    // console.log('stepChanged');
    args.previousStep.state = this.stepStates.disabled;
    // console.log(args);
  }

  isValidFunctionReturnsBoolean(args: StepValidationArgs) {
    console.log(this.documentoForm.value['documento']);

    if (args.fromStep.index == 0) {
      if (this.documentoForm.invalid) {
        this.notificacion.MensajeError("Ingrese documento", "Error");
        return false;
      } else return true;
    }

    if (args.fromStep.index == 1) {
      if (this.personaForm.invalid) {
        this.notificacion.MensajeError("Formulario invalidos", "Error");
        return false;
      } else return true;
    }
    return true;
  }

  isValidFunctionReturnsObservable(args: StepValidationArgs) {
    console.log('isValidFunctionReturnsObservable');
    return of(true);
  }

}
