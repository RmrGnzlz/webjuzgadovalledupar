import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../Usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
constructor(private _usuarioService: UsuarioService,private router: Router){
}

  canActivate(){
    if(!this._usuarioService.Logueado()){
      this.router.navigate(['/login']);
         return false;
  }

  return true;
  }

}
