import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../Usuario/usuario.service';
import { ModalAuthService } from '../../components/modal-auth/modal-auth.service';

@Injectable({
  providedIn: 'root'
})
export class VerficiaTokenGuard implements CanActivate {

constructor(private _usuarioService: UsuarioService,
  private _modalService:ModalAuthService,
  private router:Router){

}

canActivate(): Promise<boolean> | boolean {
  const token = this._usuarioService.token;
  const payload = JSON.parse(atob(token.split('.')[1]));
  console.log(payload);
  const expirado = this.expirado(payload.exp);
  if (expirado)
    this._modalService.mostrarModal();


  return this.verificayRenueva(payload.exp);
}

verificayRenueva(fechaExp: number): Promise<boolean> {

  return new Promise((resolve, reject) => {
    const tokenExp = new Date(fechaExp * 1000);
    const ahora = new Date();
    ahora.setTime(ahora.getTime() + (4 * 60 * 60 * 1000));
    if (tokenExp.getTime() > ahora.getTime()) {
      resolve(true);
    } else {
      const res=this._modalService.notificacion
        .subscribe(res => resolve(true),
          err => {
            reject(false);
            this.router.navigate(['/login']);
          });
    }
  });

}

expirado(fecExp: number) {
  const ahora = new Date().getTime() / 1000;
  if (fecExp < ahora) {
    return true;
  } else {
    return false;
  }
}



}
