import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';
import { ServicieGeneric } from '../ServiceGeneric';
import { ResponseHttp } from '../../models/Base/ResponseHttp';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: Usuario;
  public token: string = '';
  menu: any[] = [];
  constructor(private router: Router, private _ServiceGeneric: ServicieGeneric) {

    this.cargarStorage();
   }

   login(user: Usuario) {

      return this._ServiceGeneric.postPatch<ResponseHttp<any>>('usuario/auth/login',user)
      .pipe(
        map(res=>{
          console.log(res);
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('expiracion', res.data.expiracion);
          return this.cargarUsuario();
        },
        err=>{return false})
      );

  }

  cargarUsuario(){
    this._ServiceGeneric.getRemove<ResponseHttp<Usuario>>(null,'usuario')
      .pipe(
        map(res=>{
          this.usuario=res.data as Usuario;
          console.log(this.usuario);

          localStorage.setItem('persona', JSON.stringify(this.usuario.persona));
          localStorage.setItem('funcionalidades', JSON.stringify(this.usuario.funcionalidades));
          return true;
        },
        err=>{return false})
      );
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = null;
    }
  }

  Logueado() {
    return (this.token.length > 5) ? true : false;
  }

  Logout() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('id');
    localStorage.removeItem('menu');
    this.menu = [];
    this.router.navigate(['/login']);
  }
}
