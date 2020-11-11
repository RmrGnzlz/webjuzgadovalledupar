import { EdificioModel } from './../../../models/EdificioModel';
import { SalaModel } from './../../../models/Sala.Model';
import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { IHeaderTemplate, IInformationTemplate } from 'src/app/components/tabla-component/tabla-component.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import * as alertify from 'alertifyjs';
import { EdificioService } from '../../../Service/Edificio/edificio.service';
import { SalaService } from '../../../Service/Sala/sala.service';

@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.css']
})
export class SalaComponent implements OnInit {

  ListaEdificios: EdificioModel[] = [];
  ListaSalas: SalaModel[] = [];

  constructor(private _ServcioEdificio: EdificioService,
    private _ServicioSala: SalaService) { }

  ngOnInit(): void {
    this._ServcioEdificio.GetAll().subscribe(res => this.ListaEdificios = res);
    this._ServicioSala.GetAll().subscribe(res => this.ListaSalas = res);
  }

  Sala: SalaModel;

  @ViewChild('rows') rows: TemplateRef<any>;
  headersUsuarios: IHeaderTemplate[];
  informationTable: IInformationTemplate = { title: 'Sala de audiencia', subTitle: 'Información de sala' };

  validate = new FormGroup({
    nombre: new FormControl('', Validators.required),
    edificio: new FormControl('', Validators.required)
  });


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
      alertify.prompt('Prompt Message');
      console.log('error en los datos');
      return;
    }
    _Ser
    console.log(this.validate.valid);

  }



}
