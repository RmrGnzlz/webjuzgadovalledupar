import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { IHeaderTemplate, IInformationTemplate } from 'src/app/components/tabla-component/tabla-component.component';

@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.css']
})
export class SalaComponent implements OnInit {
  @ViewChild('rows',{static: false}) rows: TemplateRef<any>;
  registros = [
    { codigo: '1', nombre: 'sdsdsd' },
    { codigo: '1', nombre: 'sdsdsd' },
    { codigo: '1', nombre: 'sdsdsd' },
    { codigo: '1', nombre: 'sdsdsd' },
    { codigo: '1', nombre: 'sdsdsd' },
    { codigo: '1', nombre: 'sdsdsd' },
    { codigo: '1', nombre: 'sdsdsd' },
    { codigo: '1', nombre: 'sdsdsd' },
    { codigo: '1', nombre: 'sdsdsd' },
    { codigo: '1', nombre: 'sdsdsd' },
    { codigo: '1', nombre: 'sdsdsd' },
    { codigo: '1', nombre: 'sdsdsd' },
    { codigo: '1', nombre: 'sdsdsd' },
    { codigo: '1', nombre: 'sdsdsd' },
  ]
  headersUsuarios: IHeaderTemplate[];
  informationTable: IInformationTemplate = { title: 'Sala de audiencia', subTitle: 'Información de sala' };

  ngOnInit(): void {

  }
  constructor() { }
  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit(): void {
    this.headersUsuarios = [
      { value: 'codigo', text: 'cod Identificacion', templateRef: undefined },
      // { value: 'identificacion', text: 'Identificación', templateRef: this.rows },
      { value: 'nombre', text: 'nombre sala', templateRef: undefined },
      // { value: 'role.nombre', text: 'Role', templateRef: this.rows },
      // { value: 'actions', text: 'Bloquear', templateRef: this.rows },
      // { value: 'verMas', text: 'Ver Más', templateRef: this.rows },
    ];
  }





}
