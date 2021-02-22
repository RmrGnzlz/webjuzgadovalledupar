import { EventEmitter, Injectable } from '@angular/core';
import { UsuarioService } from '../../Service/Usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ModalAuthService {

  public oculto: string = 'oculto';

  public notificacion = new EventEmitter<Boolean>();

  constructor(private usuarioService: UsuarioService) { }


  ocultarModalYLogout() {
    this.oculto = 'oculto';
    this.usuarioService.Logout();
    // this.tipo = null;
    // this.id = null;

  }

  mostrarModal() {
      this.oculto = '';
      // this.tipo = tipo;
      // this.id = id;
  }

}
