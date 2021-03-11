import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';
import { ServicieGeneric } from '../ServiceGeneric';
import { ResponseHttp } from '../../models/Base/ResponseHttp';
import { map } from 'rxjs/operators';
import { Modulo } from 'src/app/models/Modulo';
import { Persona } from '../../models/Persona';
import { NgxPermissionsService, NgxRolesService} from 'ngx-permissions';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public token: string = '';
  public modulos: Modulo[] = [];
  public DatosBasicos: any = {}


  constructor(private router: Router, private _ServiceGeneric: ServicieGeneric,
    private permissionsService: NgxPermissionsService,
    private rolesService: NgxRolesService) {

    this.cargarStorage();
  }


  renovarToken(username: string, password: string) {
    localStorage.removeItem('token');
    return this._ServiceGeneric.postPatch<ResponseHttp<any>>('usuario/auth/login', { username, password })
      .pipe(
        map(res => {
          localStorage.setItem('token', res.data.token);
          return true;
        },
          err => { return false })
      );
  }

  login(username: string, password: string) {

    return this._ServiceGeneric.postPatch<ResponseHttp<any>>('usuario/auth/login', { username, password })
      .pipe(
        map(async res => {
          sessionStorage.setItem('token', res.data.token);
          this.token=res.data.token;
          // console.log(this.jwtHelperService.decodeToken(this.token));
          return await this.obtenerFuncionalidades().toPromise();
        })
      )


  }

  obtenerFuncionalidades() {
    return this._ServiceGeneric.getRemove<ResponseHttp<any>>(null, 'usuario')
      .pipe(
        map(res => {
          this.modulos = res.data.modulos;
          var persona: Persona = res.data.persona;
          this.DatosBasicos.nombres = `${persona.nombres} ${persona.apellidos}`;
          this.DatosBasicos.rol = (res.data.tipoCargo as string).toLowerCase();
          this.DatosBasicos.usuario = res.data.username;
          var permisos = this.ObtenerPermisos(res.data.modulos);
          localStorage.setItem('datosBasicos', JSON.stringify(this.DatosBasicos));
          localStorage.setItem('menu', JSON.stringify(permisos));
          this.rolesService.addRoleWithPermissions(this.DatosBasicos.rol, permisos);
          return this.DatosBasicos.rol;
        })
      )
  }




  ObtenerPermisos(modulos: any) {
    var funcionalidades: string[] = [];
    this.modulos.forEach(function (value) {
      funcionalidades.push(value.nombre);
      value.funcionalidades.forEach(function (value2) {
        funcionalidades.push(value2.codigo);
      })
    })
    return funcionalidades;
    // console.log(this.permissionsService.getPermissions())
    // this.roleService.addRole((this.DatosBasicos.rol as string).toLowerCase(),funcionalidades);
  }




  cargarStorage() {
    if (sessionStorage.getItem('token')) {
      this.token = sessionStorage.getItem('token');
      var permisos=JSON.parse(localStorage.getItem('menu'));
      this.DatosBasicos=JSON.parse(localStorage.getItem('datosBasicos'));
      console.log(this.DatosBasicos.rol);

      this.rolesService.addRoleWithPermissions('auditor', permisos);

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
