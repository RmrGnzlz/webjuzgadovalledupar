import { SalaModel } from './../../../models/Sala.Model';
import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { IHeaderTemplate, IInformationTemplate } from 'src/app/components/tabla-component/tabla-component.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

declare let alertify: any;

@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.css']
})
export class SalaComponent implements OnInit {
  constructor() { }

  Sala: SalaModel;

  @ViewChild('rows') rows: TemplateRef<any>;
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
  ];

  edificios = [
    {value: '1', dato: 'sdsd' },
    {value: '1', dato: 'sdsd' },
    {value: '1', dato: 'sdsd' },
    {value: '1', dato: 'sdsd' }
  ];

  headersUsuarios: IHeaderTemplate[];
  informationTable: IInformationTemplate = { title: 'Sala de audiencia', subTitle: 'Información de sala' };

  validate = new FormGroup({
    nombre: new FormControl('', Validators.required),
    edificio: new FormControl('', Validators.required)
  });

  ngOnInit(): void {

  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit(): void {
    this.headersUsuarios = [
      { value: 'Nombre', text: 'Sala', templateRef: undefined },
      // { value: 'identificacion', text: 'Identificación', templateRef: this.rows },
      { value: 'nombre', text: 'Edificio', templateRef: undefined },
      { value: 'estado', text: 'Estado', templateRef: undefined },
      // { value: 'role.nombre', text: 'Role', templateRef: this.rows },
      // { value: 'actions', text: 'Bloquear', templateRef: this.rows },
      // { value: 'verMas', text: 'Ver Más', templateRef: this.rows },
    ];
  }

  add() {
    if (this.validate.invalid) {
      console.log('hola');
      alertify.alert('Ready!')
    }

    console.log(this.validate.valid);

  }



}
