import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {  StepChangedArgs, StepValidationArgs, STEP_STATE } from 'ng-wizard';
import { of } from 'rxjs';
import { TipoDocumentos } from 'src/app/models/Enums/DocumentosValidosEnum';
import { ServicieGeneric } from 'src/app/Service/service.index';
import { NotificacionServiceService } from 'src/app/utils/notificacion-service.service';
import { Router } from '@angular/router';
import { ResponseHttp } from 'src/app/models/Base/ResponseHttp';
import { Empleado } from 'src/app/models/Enpleado';
import { Persona } from 'src/app/models/Persona';
import { Rol } from '../../../../models/Rol';
import { Pais } from '../../../../models/Pais';

@Component({
  selector: 'app-registro-empleado',
  templateUrl: './registro-empleado.component.html',
  styleUrls: ['./registro-empleado.component.css']
})
export class RegistroEmpleadoComponent implements OnInit {

  @ViewChild('personaForm', { static: false }) personaForm: NgForm;
  @ViewChild('empleadoForm', { static: false }) empleadoForm: NgForm;
  @ViewChild('documentoForm', { static: false }) documentoForm: NgForm;

  persona:Persona;
  empleado = new Empleado();
  tipoDocumentos: any[] = [];
  existePersona = false;
  roles:Rol[]=[];
  paises:Pais[]=[];


  constructor(private notificacion: NotificacionServiceService,
    private _ServiceGeneric: ServicieGeneric,
    private router: Router,) { }

  ngOnInit(): void {

    this.persona=new Persona();

    this._ServiceGeneric.getRemove<ResponseHttp<Rol>>(null,`rol`)
    .subscribe(res=>this.roles=res.data as Rol[])

    this._ServiceGeneric.getRemove<ResponseHttp<Pais>>(null,'Pais')
      .subscribe(res=>this.paises=res.data as Pais[]);

    // this._ServiceGeneric.myPostpatch<Rol>(null,'','post')

    this.loadEnums();
  }

  loadEnums() {
    for (const item in TipoDocumentos) {
      if (isNaN(Number(item))) {
        this.tipoDocumentos.push({ nombre: item, key: TipoDocumentos[item] });
      }
    }

  }

  validarFormulario() {
    if (this.documentoForm.invalid || this.personaForm.invalid || (this.documentoForm.value['documento'] != this.persona.numeroDocumento)) {
      this.notificacion.MensajeError("Anomalia en el formulario", "Intente nuevamente")
      return;
    }

    if (this.empleadoForm.invalid) {
      this.notificacion.MensajeError("Formulario invalido", "Error");
      return;
    }

 this.actualizarOAgregarPersona();

  }

  consultarPersona() {
    this._ServiceGeneric.getRemove<ResponseHttp<Persona>>(this.persona.numeroDocumento, `persona`)
      .subscribe(res => {
        this.persona = res.data as Persona;
        this.empleado.personaKey=this.persona.key;
        this.existePersona = true;

      });
  }

  actualizarOAgregarPersona() {
    var metodo: any = 'post'
    if (this.existePersona) metodo = 'put'
    this.persona.nacionalidadKey=this.persona.nacionalidad.key;



    this._ServiceGeneric.postPatch<ResponseHttp<Persona>>(`persona`, this.persona, null, metodo)
      .subscribe(res =>{
        this.persona=res.data as Persona;
        this.registrarEmpleado();
      });
  }

  registrarEmpleado() {
    console.log('registrar empleado');

    this.empleado.personaKey=this.persona.key;
    this._ServiceGeneric.postPatch<ResponseHttp<Empleado>>(`empleado`, this.empleado,null,"post")
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

      if(args.previousStep!=undefined)
      args.previousStep.state=this.stepStates.disabled;

  }

  isValidFunctionReturnsBoolean(args: StepValidationArgs) {
    console.log(this.documentoForm.value['documento']);

    if (args.fromStep.index == 0) {
      if (this.documentoForm.invalid) {
        this.notificacion.MensajeError("Ingrese documento", "Error");
        return false;
      } else {
        this.consultarPersona();
        return true;}
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
