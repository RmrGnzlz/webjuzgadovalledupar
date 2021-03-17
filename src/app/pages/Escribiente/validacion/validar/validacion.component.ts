import { EstadoSolicitud } from './../../../../models/Enums/EstadoSolicitudEnum';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StepChangedArgs, StepValidationArgs } from 'ng-wizard';
import { of } from 'rxjs';
import { ServicieGeneric } from 'src/app/Service/ServiceGeneric';
import { NotificacionServiceService } from 'src/app/utils/notificacion-service.service';

@Component({
  selector: 'app-validacion',
  templateUrl: './validacion.component.html',
  styleUrls: ['./validacion.component.css']
})
export class ValidacionComponent implements OnInit {

  isValidTypeBoolean: boolean = true;
  form: FormGroup;
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
