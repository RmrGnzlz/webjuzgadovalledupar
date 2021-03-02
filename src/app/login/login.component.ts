import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/Usuario';
import { NgForm } from '@angular/forms';
import { NotificacionServiceService } from '../utils/notificacion-service.service';
import { UsuarioService } from '../Service/Usuario/usuario.service';
import { Router } from '@angular/router';

declare function INIT_PLUGIN();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario= new Usuario();
  constructor(
    private notificacion:NotificacionServiceService,
             private _serviceUsuario:UsuarioService,
             private route:Router) { }

  ngOnInit() {
    INIT_PLUGIN();

    sessionStorage.setItem('token','dfdfscsdfssdfsfs.adsfsfsdsfsdfsfsfsfsfs.sfsfsfsfsf');
  }

  login(form:NgForm){
    if(form.invalid){
        this.notificacion.MensajeError("Datos Incompleto");
        return;
      }
      this._serviceUsuario.login(this.usuario.username,this.usuario.password)
      .subscribe(res=>{
        window.location.href = '#/dashboard'
      },
      err=>{console.log('error loguin');
      })

  }

}
