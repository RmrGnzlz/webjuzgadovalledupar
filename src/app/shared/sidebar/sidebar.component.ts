import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../Service/Usuario/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  usuario:string;
  rol:string;
  constructor(private _usuarioService: UsuarioService) { }
  menu: any;
  ngOnInit() {

    this.usuario=this._usuarioService.DatosBasicos.nombres;
    this.rol=this._usuarioService.DatosBasicos.rol;
    this.menu = [
      { titulo: 'Dashboard', icono: 'mdi mdi-gauge', permiso: '', url: `${this.rol}` },
      { titulo: 'Gestión Salas', icono: 'fa fa-group', permiso: 'GESTIONAR SALAS', url: 'tecnico/sala' },
      { titulo: 'Gestión Juzgados', icono: 'fa fa-gavel', permiso: 'GESTIONAR JUZGADOS', url: 'tecnico/juzgado' },
      { titulo: 'Gestión Edificio', icono: 'fa fa-building-o', permiso: 'EDI-01', url: 'tecnico/edificio' },
      { titulo: 'Gestión Empleado', icono: 'fa fa-user-circle-o', permiso: 'GESTIONAR USUARIOS', url: 'tecnico/empleado' },
      // { titulo: 'Gestión ', icono: '', permiso: 'GESTIONAR USUARIOS', url: 'tecnico/empleado' }


    ]
  }

  logout(){
    this._usuarioService.Logout();
  }

}



// DESP-01	CONSULTAR DESPACHOS
// DESP-02	REGISTRAR DESPACHOS
// DESP-03	ACTUALIZAR DESPACHOS
// DESP-04	ELIMINAR DESPACHOS
// JUZG-01	CONSULTAR JUZGADOS
// JUZG-02	REGISTRAR JUZGADOS
// JUZG-03	ACTUALIZAR JUZGADOS
// JUZG-04	ELIMINAR JUZGADOS
// PERS-01	CONSULTAR PERSONAS
// PERS-02	REGISTRAR PERSONAS
// PERS-03	ACTUALIZAR PERSONAS
// PERS-04	ELIMINAR PERSONAS
// SALA-01	CONSULTAR SALAS
// SALA-02	REGISTRAR SALAS
// SALA-03	ACTUALIZAR SALAS
// SALA-04	ELIMINAR SALAS
// USER-01	CONSULTAR USUARIOS
// USER-02	REGISTRAR USUARIOS
// USER-03	ACTUALIZAR USUARIOS
// USER-04	ELIMINAR USUARIOS
