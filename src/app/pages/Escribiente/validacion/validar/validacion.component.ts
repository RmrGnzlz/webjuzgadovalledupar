import { EstadoSolicitud } from './../../../../models/Enums/EstadoSolicitudEnum';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StepChangedArgs, StepValidationArgs } from 'ng-wizard';
import { of } from 'rxjs';
import { ServicieGeneric } from 'src/app/Service/ServiceGeneric';
import { NotificacionServiceService } from 'src/app/utils/notificacion-service.service';
import { Columns } from 'ngx-easy-table';
import { Persona } from '../../../../models/Persona';

@Component({
  selector: 'app-validacion',
  templateUrl: './validacion.component.html',
  styleUrls: ['./validacion.component.css']
})
export class ValidacionComponent implements OnInit {

  @ViewChild('actionTpl', { static: true }) actionTpl: TemplateRef<any>;
  @ViewChild('botonCerrar', { static: false }) botonCerrar: ElementRef;

  isValidTypeBoolean: boolean = true;
  public Columns: Columns[];
  form: FormGroup;

  //VARIABLES_SIMULAR
  partesProcesalesSimulado:any;
  //fin variables a simular

  constructor(private formBuilder: FormBuilder,
    private _ServiceGeneric: ServicieGeneric,
    private notificacion: NotificacionServiceService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      solicitudKey: [''],
      asunto: ['', [Validators.minLength(4),Validators.required]],
      descripcion: ['', [Validators.required]],
      estado: ['1', [Validators.required]],
    });

    this.Columns = [
      { key: 'tipo', title: 'Tipo',width:"5%" },
      { key: 'nombres', title: 'Nombre',width:"20%" },
      { key: 'dirrecion', title: 'Dirección',width:"15%"},
      { key: 'telefono', title: 'Telefono',width:"10%" },
      { key: 'correo', title: 'Correo',width:"10%"},
      { key: 'opciones', title: 'Opciones',width:"5%",cellTemplate: this.actionTpl},
    ];

    this.valoresSimular();
  }

  valoresSimular(){
    this.partesProcesalesSimulado=[
      {key:1,tipo:'Juez',nombres:'Helmer Segundo Fuentes Alvarado',dirrecion:'calle 16b# 27-05 villa corelca',telefono:'3145096908',correo:'helmerfa@gmail.com'},
      {key:2,tipo:'Abogado',nombres:'Helmer Segundo Fuentes Alvarado',dirrecion:'calle 16b# 27-05 villa corelca',telefono:'3145096908',correo:'helmerfa@gmail.com'},
      {key:3,tipo:'Acusado',nombres:'Helmer Segundo Fuentes Alvarado',dirrecion:'calle 16b# 27-05 villa corelca',telefono:'3145096908',correo:'helmerfa@gmail.com'},
      {key:4,tipo:'Fiscal',nombres:'Helmer Segundo Fuentes Alvarado',dirrecion:'calle 16b# 27-05 villa corelca',telefono:'3145096908',correo:'helmerfa@gmail.com'},
      {key:5,tipo:'Juzgado',nombres:'Helmer Segundo Fuentes Alvarado',dirrecion:'calle 16b# 27-05 villa corelca',telefono:'3145096908',correo:'helmerfa@gmail.com'},
      {key:5,tipo:'Juzgado',nombres:'Helmer Segundo Fuentes Alvarado',dirrecion:'calle 16b# 27-05 villa corelca',telefono:'3145096908',correo:'helmerfa@gmail.com'},
      {key:5,tipo:'Juzgado',nombres:'Helmer Segundo Fuentes Alvarado',dirrecion:'calle 16b# 27-05 villa corelca',telefono:'3145096908',correo:'helmerfa@gmail.com'},
    ]

  }

  submit(){

    if (this.form.invalid) {
      this.notificacion.MensajeError('Formulario Invalido','Informacion');
      this.form.markAllAsTouched();
      return;
    }
    this.estado.setValue(+this.estado.value);
    this.notificacion.MensajeSuccess
  }
  verAnexo(){
    console.log('hola');
  }

  updateDatosNotificacion(){

  }

  showSujeto(persona:any){
    console.log(persona);

  }


  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  isValidFunctionReturnsBoolean(args: StepValidationArgs) {
    return true;
  }
  isValidFunctionReturnsObservable(args: StepValidationArgs) {
    console.log('isValidFunctionReturnsObservable');
    return of(true);
  }

  get solicitud() { return this.form.get('solicitudKey'); }
  get asunto() { return this.form.get('asunto'); }
  get descripcion() { return this.form.get('descripcion'); }
  get estado() { return this.form.get('estado'); }

}
