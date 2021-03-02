import { ResponseHttp } from '../../models/Base/ResponseHttp';
import { SujetosProcesales } from '../../models/Enums/TipoSujetosProcesalesEnum';
import { Persona } from '../../models/Persona';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgWizardConfig, NgWizardService, StepChangedArgs, StepValidationArgs, STEP_STATE, THEME } from 'ng-wizard';
import { of, Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { NotificacionServiceService } from '../../utils/notificacion-service.service';
import { SolicitudAudienciaResponse, SolicitudAudienciaRequest } from '../../models/SolicitudAudiencia';
import { ServicieGeneric } from '../../Service/service.index';
import { TipoDocumentos } from '../../models/Enums/DocumentosValidosEnum';
import { Rol } from '../../models/Rol';
import { Pais } from '../../models/Pais';
declare function INIT_PLUGIN();

@Component({
  selector: 'app-solitud-anonima',
  templateUrl: './solitud-anonima.component.html',
  styleUrls: ['./solitud-anonima.component.css']
})
export class SolitudAnonimaComponent implements OnInit {

  @ViewChild('personaForm', { static: false }) personaForm: NgForm;
  @ViewChild('solicitudForm', { static: false }) solicitudForm: NgForm;

  persona = new Persona();
  solicitudAudiencia= new SolicitudAudienciaRequest();
  soliitudSudienciaResponse = new SolicitudAudienciaResponse();
    tipoSujetoProcesales: any[] = [];
  tipoDocumentos:any[]=[];
  exitosa = false;
  paises:Pais[]=[];


  stepStates = {
    normal: STEP_STATE.normal,
    disabled: STEP_STATE.disabled,
    error: STEP_STATE.error,
    hidden: STEP_STATE.hidden
  };


  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.dots,
    toolbarSettings: {
      showPreviousButton: false
    },
    lang: {
      next: "Siguiente"
    }
  };

  isValidTypeBoolean: boolean = true;
  CurrentDate =  Date.now();


  constructor(private ngWizardService: NgWizardService,
    private notificacion: NotificacionServiceService,
    private _ServiceGeneric: ServicieGeneric) { }

  ngOnInit(): void {
    INIT_PLUGIN();
    this.loadEnums();
    this._ServiceGeneric.getRemove<ResponseHttp<Pais>>(null,'pais')
    .subscribe(res=>{
      this.paises=res.data as Pais[];
    })
  }

   registrarSolicitudYPersona():boolean {

    if (this.solicitudForm.invalid || this.personaForm.invalid) {
      this.notificacion.MensajeError('se detectaron errores en los formularios', 'Error');
      this.exitosa=false;
      return ;
    }
    this._ServiceGeneric.postPatch<ResponseHttp<Persona>>(`persona`,this.persona,null,'post')
    .subscribe(res=>{
      this._ServiceGeneric.postPatch<ResponseHttp<SolicitudAudienciaResponse>>(`solicitud`,this.crearFormData(this.solicitudAudiencia),null,'post')
    .subscribe(res=>{
      this.soliitudSudienciaResponse=res.data as SolicitudAudienciaResponse;
      this.notificacion.MensajeSuccess(res.message)
     this.exitosa=true;
     return true;
    })}
    )


  }

  loadEnums() {
    for (const item in SujetosProcesales) {
      if (isNaN(Number(item))) {
        this.tipoSujetoProcesales.push({ nombre: item, key: SujetosProcesales[item] });
      }
    }

    for (const item in TipoDocumentos) {
      if (isNaN(Number(item))) {
        this.tipoDocumentos.push({ nombre: item, key: TipoDocumentos[item] });
      }
    }


  }

  isPDF(evento) {

    let archivo: File = evento.target.files[0];
    console.log(archivo);
    if (!archivo) {
      return;
    }
    if (archivo.type.indexOf('pdf') < 0) {

      this.solicitudForm.controls['archivo'].setErrors({ 'incorrect': true });
      evento.srcElement.value = null;
      this.notificacion.MensajeInfo("Solo se aceptan PDF", "Error");
    }
    this.solicitudAudiencia.archivo=archivo;
    return;
  }

  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  crearFormData(solicitud:SolicitudAudienciaRequest):FormData{

    console.log(solicitud);

    const formdata = new FormData();
    formdata.append('proceso',solicitud.proceso);
    formdata.append('solicitante',this.persona.numeroDocumento);
    formdata.append('asunto',solicitud.asunto);
    formdata.append('archivo',solicitud.archivo);
    formdata.append('descripcion',solicitud.descripcion);
    formdata.append('tipoSolicitante',  SujetosProcesales[solicitud.tipoSolicitante]);

    return formdata;
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
    if(args.previousStep!=undefined)
      args.previousStep.state=this.stepStates.disabled;
  }


  isValidFunctionReturnsBoolean(args: StepValidationArgs) {
      console.log('isValidFunctionReturnsBoolean');

    if (args.fromStep.index == 0) {

      if (this.personaForm.invalid) {
          this.personaForm.form.markAllAsTouched();
          this.notificacion.MensajeError("Formulario invalidos", "Error");
          return false;
        }

        if(Date.parse(this.persona.expedicionDocumento.toString()) > this.CurrentDate.valueOf()){
          this.notificacion.MensajeError("Mayor al dia de hoy", "Fecha invalida");
          return false;
        }
        return true;
    }


    if (args.fromStep.index == 1) {
      console.log(this.solicitudForm);
      if (this.solicitudForm.invalid) {
        this.solicitudForm.form.markAllAsTouched();
        this.notificacion.MensajeError("Formulario invalidos", "Error");
        return false;
      } else {

        var respuesta:boolean=this.registrarSolicitudYPersona();
        console.log(respuesta);
        return true;
      }
    }

  }

  isValidFunctionReturnsObservable(args: StepValidationArgs) {
    console.log('isValidFunctionReturnsObservable');

    return of(true);
  }


}
