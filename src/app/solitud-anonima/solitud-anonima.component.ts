import { SujetosProcesales } from './../models/Enums/TipoSujetosProcesalesEnum';
import { Persona } from './../models/Persona';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgWizardConfig, NgWizardService, StepChangedArgs, StepValidationArgs, STEP_STATE, THEME } from 'ng-wizard';
import { of, Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { NotificacionServiceService } from '../utils/notificacion-service.service';
import { SolicitudAudiencia, SolicitudAudienciaRequest } from '../models/SolicitudAudiencia';
import { ServicieGeneric } from '../Service/service.index';


@Component({
  selector: 'app-solitud-anonima',
  templateUrl: './solitud-anonima.component.html',
  styleUrls: ['./solitud-anonima.component.css']
})
export class SolitudAnonimaComponent implements OnInit {

  @ViewChild('personaForm',{static:false})personaForm: NgForm;
  @ViewChild('solicitudForm',{static:false})solicitudForm: NgForm;

  persona = new Persona();
  solicitudAudiencia= new SolicitudAudienciaRequest();
  soliitudSudienciaResponse= new SolicitudAudiencia();
  nombresYapellidos:string[]=["","","",""];
  tipoSujetoProcesales:any[]=[];
  exitosa=false;

  stepStates = {
    normal: STEP_STATE.normal,
    disabled: STEP_STATE.disabled,
    error: STEP_STATE.error,
    hidden: STEP_STATE.hidden
  };


  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.dots,
    toolbarSettings:{
      showPreviousButton:false
    },
    lang:{
      next:"Siguiente"
    }
  };

  isValidTypeBoolean: boolean = true;
  CurrentDate = new Date();


  constructor(private ngWizardService: NgWizardService,
    private notificacion: NotificacionServiceService,
    private _ServiceGeneric: ServicieGeneric) { }

  ngOnInit(): void {
    this.loadEnums();
  }

  SolicitarRespuesta(url:string, data:any){
    let respuesta:boolean;
    return new Promise(resolve=>{
    this._ServiceGeneric.postPatch<any>(url,data)
    .subscribe((res:any)=>{
      resolve(res);
      },err=>{resolve(false)});
    });



    return respuesta;
  }

 async registrarPersona(){
    let respuesta:boolean;
    if (this.personaForm.invalid) {
      this.notificacion.MensajeError('Formulario invalido','Información');
      return false;
    }

    return await this.SolicitarRespuesta(`persona`,this.persona);

  }

  async registrarSolicitud(){
    let respuesta: boolean;
    if (this.solicitudForm.invalid) {
      this.notificacion.MensajeError('Formulario invalido','Información');
      return false;
    }
    return await this.SolicitarRespuesta(`solicitud`,SolicitudAudienciaRequest);

  }

  loadEnums(){
    for (const item in SujetosProcesales) {
      if (isNaN(Number(item))) {
        this.tipoSujetoProcesales.push({ nombre: item, key: SujetosProcesales[item] });
      }
    }
  }

    isPDF(evento){

      let archivo: File=evento.target.files[0];
      console.log(archivo);
      if (!archivo) {
        return;
      }
      if (archivo.type.indexOf('pdf')<0) {

        this.solicitudForm.controls['archivo'].setErrors({'incorrect': true});
        evento.srcElement.value = null;
        this.notificacion.MensajeInfo("Solo se aceptan PDF","Error");
      }
      return;
    }

  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }


  //METODOS PARA EL PASO A PASO ->
  showPreviousStep(event?: Event) {
    console.log(' showPreviousStep');

    this.ngWizardService.previous();
  }

  showNextStep(event?: Event) {
    // console.log(' showPreviousStep');

    this.ngWizardService.next();
  }

  resetWizard(event?: Event) {
    // console.log('resetWizard');

    this.ngWizardService.reset();
  }

  setTheme(theme: THEME) {
    // console.log('setTheme');

    this.ngWizardService.theme(theme);
  }

  stepChanged(args: StepChangedArgs) {
    // console.log('stepChanged');
    args.previousStep.state = this.stepStates.disabled;
    // console.log(args);
  }


  isValidFunctionReturnsBoolean(args: StepValidationArgs) {

    console.log(args);
    if (args.fromStep.index==0 ) {

      if (this.personaForm.invalid) {
        this.notificacion.MensajeError("Formulario invalidos","Error");
        return false;
      }else{

         return this.registrarPersona();
      }
    }
    if (args.fromStep.index==1 ) {
        console.log(this.solicitudForm);
      if (this.solicitudForm.invalid) {
        this.notificacion.MensajeError("Formulario invalidos","Error");
        return false;
      }else{
        return this.registrarSolicitud();
      }
    }

  }

  isValidFunctionReturnsObservable(args: StepValidationArgs) {
    console.log('isValidFunctionReturnsObservable');

    return of(true);
  }

  emularPersona():Observable<any>{

    let  p = new Persona();
    p.NumeroDocumento="34343434";

    let persona:any={
      estado:true,
      mensaje:"excelente",
      data:p
    }

    return of(persona)
  }

  emularSolicitud():Observable<any>{
    let s = new SolicitudAudiencia();
    s.radicado="8873848347384734";
    let solicitud:any={
      estado:true,
      mensaje:"excelente",
      data:s
    }

    return of(solicitud);

  }

}
