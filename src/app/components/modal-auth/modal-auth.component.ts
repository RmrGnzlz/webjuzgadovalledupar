import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalAuthService } from './modal-auth.service';
import { NotificacionServiceService } from '../../utils/notificacion-service.service';
import { UsuarioService } from 'src/app/Service/service.index';

@Component({
  selector: 'app-modal-auth',
  templateUrl: './modal-auth.component.html',
  styleUrls: []
})
export class ModalAuthComponent implements OnInit {


  public usuario:string;
  public password:string;

  constructor(public _serviceModal:ModalAuthService,
              private notificacion:NotificacionServiceService,
              private _serviceUsuario:UsuarioService
            ) { }

  ngOnInit(): void {
    this.usuario="helmerfa";
    // this._serviceUsuario.usuario.username;
  }

  public cerrarModalYLogout(){
      this._serviceModal.ocultarModalYLogout();
  }

  ingresar(form:NgForm){

    if (form.invalid) {
      this.notificacion.MensajeInfo("Formulario Invalido")
      return;
    }
      this._serviceUsuario.renovarToken(this.usuario,this.password)
      .subscribe(res=>{
        this._serviceModal.notificacion.emit(true);
          this.notificacion.MensajeSuccess("Ingreso actualizado");
          this._serviceModal.oculto='oculto';

      },
      err=>this._serviceModal.notificacion.emit(false));

  }

}
