import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Columns } from 'ngx-easy-table';

@Component({
  selector: 'app-listado-reparto',
  templateUrl: './listado-reparto.component.html',
  styleUrls: ['./listado-reparto.component.css']
})
export class ListadoRepartoComponent implements OnInit {
  @ViewChild('botonCerrar', { static: false }) botonCerrar: ElementRef;
  @ViewChild('tipoTpl', { static: true }) tipoTpl: TemplateRef<any>;
  @ViewChild('numeroTpl', { static: true }) numeroTpl: TemplateRef<any>;
  @ViewChild('estadoTpl', { static: true }) estadoTpl: TemplateRef<any>;
  @ViewChild('actionTpl', { static: true }) actionTpl: TemplateRef<any>;

  public Columns: Columns[];
  constructor() { }

  ngOnInit(): void {
    this.Columns = [
      { key: 'edificio.nombre', title: 'Solicitante',width:'40' },
      { key: 'nombre', title: 'Fecha',width:'40' },
      { key: 'tipo', title: 'Prioridad', cellTemplate: this.tipoTpl,width:'10' },
      { key: 'estado', title: 'Proceso (C.U.I)', cellTemplate: this.estadoTpl,width:'10' },
      { key: 'opciones', title: 'Opciones', cellTemplate: this.actionTpl,width:'20' },
    ];
  }

}
