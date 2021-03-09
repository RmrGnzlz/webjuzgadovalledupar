import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';
import { ServicieGeneric } from '../ServiceGeneric';
import { ResponseHttp } from '../../models/Base/ResponseHttp';
import { map } from 'rxjs/operators';
import { Modulo } from 'src/app/models/Modulo';
import { Persona } from '../../models/Persona';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public token: string = '';
  public modulos:Modulo[]=[];
  public DatosBasicos:any={}


  constructor(private router: Router, private _ServiceGeneric: ServicieGeneric) {

    this.cargarStorage();
   }


  renovarToken(username:string,password:string) {
    localStorage.removeItem('token');
    return this._ServiceGeneric.postPatch<ResponseHttp<any>>('usuario/auth/login',{username,password})
    .pipe(
      map(res=>{
        localStorage.setItem('token', res.data.token);
        return true;
      },
      err=>{return false})
    );
  }

    login(username:string,password:string) {

       return  this._ServiceGeneric.postPatch<ResponseHttp<any>>('usuario/auth/login',{username,password})
      .pipe(
        map(async res=>{
          sessionStorage.setItem('token', res.data.token);
          return await this.obtenerFuncionalidades().toPromise();
        })
      )


  }

  obtenerFuncionalidades(){
    return  this._ServiceGeneric.getRemove<ResponseHttp<any>>(null,'usuario')
    .pipe(
      map(res=>{
        this.modulos=res.data.modulos;
        var persona: Persona=res.data.persona;
        this.DatosBasicos.nombres=`${persona.nombres} ${persona.apellidos}`;
          this.DatosBasicos.rol=res.data.tipoCargo;
          this.DatosBasicos.usuario=res.data.username;
        localStorage.setItem('menu', JSON.stringify(this.modulos));
        localStorage.setItem('datosBasicos', JSON.stringify(this.DatosBasicos));
        return res.data.tipoCargo;
      })
    )


  }



  cargarStorage() {
    if (sessionStorage.getItem('token')) {
      this.token = sessionStorage.getItem('token');
      this.modulos = JSON.parse(localStorage.getItem('menu'));

    } else {
      this.token = '';
      this.modulos = null;
    }
  }

  Logueado() {
    return (this.token.length > 5) ? true : false;
  }

  Logout() {
    this.token = '';
    sessionStorage.removeItem('token');
    localStorage.removeItem('datosBasicos');
    localStorage.removeItem('menu');
    this.modulos = [];
    this.router.navigate(['/login']);
  }
}
