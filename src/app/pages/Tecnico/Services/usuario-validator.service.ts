import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { ResponseHttp } from '../../../models/Base/ResponseHttp';
import { environment } from '../../../../environments/environment.prod';
import { ServicieGeneric } from 'src/app/Service/service.index';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioValidatorService implements AsyncValidator{
ruta=environment.URL_SERVICIO;

  constructor(private _serviceGeneric:ServicieGeneric) { }
  validate(control: AbstractControl):  Observable<ValidationErrors>| null {
    const usuario=control.value;
    return this._serviceGeneric.getRemove<ResponseHttp<any>>(null,'usuario/validate',{username:usuario})
    .pipe(
      map(res=>{

        return (res.state===false)
        ?{usuarioDisponible:true}
        :null
      })
      )
  }

  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }
}
