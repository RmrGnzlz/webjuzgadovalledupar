import { Component, OnInit } from '@angular/core';
import { Columns } from 'ngx-easy-table';
import { Juzgado } from 'src/app/models/Juzgado';

@Component({
  selector: 'app-juzgados',
  templateUrl: './juzgados.component.html',
  styleUrls: []
})
export class JuzgadosComponent implements OnInit {

  public Columns: Columns[];
  listaJuzgado: Juzgado[] = [];
  constructor() { }

  ngOnInit(): void {
    this.Columns = [
      { key: 'nombre', title: 'Juzgado' },
      { key: 'correo', title: 'Correo' },
      { key: 'correo', title: 'Tipo' },
      { key: 'juez.nombre', title: 'Juez' },
      { key: 'correo', title: 'Despacho' },
      { key: 'opciones', title: 'Opciones'},
    ];
  }

}
