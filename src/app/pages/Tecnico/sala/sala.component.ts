import { SalaRequest, SalaResponse } from './../../../models/Sala.Model';
import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IHeaderTemplate, IInformationTemplate } from 'src/app/components/tabla-component/tabla-component.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { EdificioService } from '../../../Service/Edificio/edificio.service';
import { SalaService } from '../../../Service/Sala/sala.service';
import { Edificio } from 'src/app/models/Edificio.Model';


declare function INIT_PLUGIN();

@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.css']
})
export class SalaComponent implements OnInit {

  ListaEdificios: Edificio[] = [];
  ListaSalas: SalaResponse[] = [];


  @ViewChild('rows') rows: TemplateRef<any>;
  headersUsuarios: IHeaderTemplate[];
  informationTable: IInformationTemplate = { title: 'Sala de audiencia', subTitle: 'Información de sala' };

  constructor(private _ServcioEdificio: EdificioService,
    private _ServicioSala: SalaService) {
  }



  validate = new FormGroup({
    nombre: new FormControl('', Validators.required),
    edificio: new FormControl('', Validators.required)
  });

  ngOnInit() {
    INIT_PLUGIN();
    this._ServcioEdificio.GetAll().subscribe((res: any) => {
      this.ListaEdificios = res.data;
    },
      err => console.log('error al traer edificios')

    );

    this.ListaSalas = [
      { key: 1, nombre: 'sala1', estado: 'Activo', edificio: null },
      { key: 1, nombre: 'sala2', estado: 'Activo', edificio: null },
      { key: 1, nombre: 'sala3', estado: 'Activo', edificio: null },
      { key: 1, nombre: 'sala3', estado: 'Activo', edificio: null },
      { key: 1, nombre: 'sala3', estado: 'Activo', edificio: null },
      { key: 1, nombre: 'sala3', estado: 'Activo', edificio: null },
      { key: 1, nombre: 'sala3', estado: 'Activo', edificio: null },
      { key: 1, nombre: 'sala3', estado: 'Activo', edificio: null },
      { key: 1, nombre: 'sala3', estado: 'Activo', edificio: null },
      { key: 1, nombre: 'sala3', estado: 'Activo', edificio: null },
      { key: 1, nombre: 'sala3', estado: 'Activo', edificio: null },
      { key: 1, nombre: 'sala3', estado: 'Activo', edificio: null },
      { key: 1, nombre: 'sala3', estado: 'Activo', edificio: null },
      { key: 1, nombre: 'sala3', estado: 'Inactivo', edificio: null },
    ];
    // this._ServicioSala.GetAll().subscribe(res => this.ListaSalas = res);
  }


  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit(): void {
    this.headersUsuarios = [
      { value: 'key', text: 'Codigo', templateRef: undefined },
      { value: 'edificio.nombre', text: 'Edificio', templateRef: undefined },
      { value: 'nombre', text: 'Sala', templateRef: undefined },
      { value: 'estado', text: 'Estado', templateRef: this.rows },
      { value: 'opciones', text: 'Opciones', templateRef: this.rows },
      // { value: 'identificacion', text: 'Identificación', templateRef: this.rows },
      // { value: 'role.nombre', text: 'Role', templateRef: this.rows },
      // { value: 'verMas', text: 'Ver Más', templateRef: this.rows },
    ];
  }
  ActualizarSala(sala: SalaRequest){
    console.log(sala);

  }
  Eliminar(sala: SalaRequest){
    console.log(sala);

  }
  add() {
    if (this.validate.invalid) {
      console.log('error en los datos');
      Swal.fire({
        icon: 'error',
        title: 'Error en los datos',
      });
      return;
    }



    this._ServicioSala.add(this.validate.get('nombre').value, this.validate.get('edificio').value)
      .subscribe(res => {
        Swal.fire({
          icon: 'success',
          text: 'Sala agregada!'
        });
      }, err => {
        Swal.fire({
          icon: 'error',
          text: 'Ocurrio un error!'
        });
      });


  }



}
