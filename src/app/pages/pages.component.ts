import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../Service/Usuario/usuario.service';

declare function INIT_PLUGIN();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor( private router: Router,private usuarioService:UsuarioService) { }

  ngOnInit() {
    INIT_PLUGIN();
    console.log('pages html');
    console.log(this.router.url);

    if(this.router.url ==='/'){
      var rol=this.usuarioService.DatosBasicos.rol;
      this.router.navigate([`/${rol}`]);
    }
  }

}
