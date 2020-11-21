import {Sala} from './../../../models/Sala.Model';
import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IHeaderTemplate, IInformationTemplate } from 'src/app/components/tabla-component/tabla-component.component';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { EdificioService } from '../../../Service/Edificio/edificio.service';
import { SalaService } from '../../../Service/Sala/sala.service';
import { Edificio } from 'src/app/models/Edificio.Model';
import { SnotifyPosition, SnotifyService } from 'ng-snotify';
import { LoginComponent } from '../../../login/login.component';
import { EstadoSala } from '../../../models/Sala.Model';



@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.css']
})
export class SalaComponent implements OnInit {

  ListaEdificios: Edificio[] = [];
  ListaSalas: Sala[] = [];
  Estados: any[] = [];
  Actualizar = false;
  form: FormGroup;
  formSubmitted = false;

  @ViewChild('botonCerrar', { static: false }) botonCerrar: ElementRef;
  @ViewChild('rows') rows: TemplateRef<any>;
  headersUsuarios: IHeaderTemplate[];
  informationTable: IInformationTemplate = { title: 'Sala de audiencia', subTitle: 'Información de sala' };

  constructor(private _ServcioEdificio: EdificioService,
              private _ServicioSala: SalaService,
              private service: SnotifyService,
              private formBuilder: FormBuilder) {
  }




  ngOnInit() {

    this._ServcioEdificio.GetAll().subscribe((res: any) => {
      this.ListaEdificios = res.data;
    },
      err => console.log('error al traer edificios')

    );

    this.ListaSalas = [
      { key: 1, nombre: 'sala1', estado: EstadoSala.Habilitada, edificio: null },
      { key: 1, nombre: 'sala3', estado: EstadoSala.Habilitada, edificio: null },
      { key: 1, nombre: 'sala2', estado: EstadoSala.Habilitada, edificio: null },
      { key: 1, nombre: 'sala3', estado: EstadoSala.Habilitada, edificio: null },
      { key: 1, nombre: 'sala3', estado: EstadoSala.Habilitada, edificio: null },
      { key: 1, nombre: 'sala3', estado: EstadoSala.Eliminada, edificio: null },
      { key: 1, nombre: 'sala3', estado: EstadoSala.Eliminada, edificio: null },
      { key: 1, nombre: 'sala3', estado: EstadoSala.Eliminada, edificio: null },
      { key: 1, nombre: 'sala3', estado: EstadoSala.Eliminada, edificio: null },
      { key: 1, nombre: 'sala3', estado: EstadoSala.Eliminada, edificio: null },

    ];

    this.buildForm();

    for (const item in EstadoSala){
      if (isNaN(Number(item))){
        this.Estados.push({text: item, value: EstadoSala[item]});
      }
    }

  }

  buildForm(){
    this.form = this.formBuilder.group({
      key: [''],
      nombre: ['', [Validators.required, Validators.minLength(4)]],
      estado: ['', [Validators.required]],
      edificio: ['', [Validators.required]]
    });
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

  ShowSala(element) {
    this.Actualizar = true;
    this.form.patchValue(element);
    const control = this.form.get('edificio');
    control.setValidators(null);
    control.updateValueAndValidity();

  }
  Update(){

    if (this.validateForm){
      const salaRequest: any = {
        id: this.form.get('key').value,
        nombre: this.form.get('nombre').value,
        estado: this.form.get('estado').value
      };
      this._ServicioSala.Update(salaRequest)
      .subscribe(res => {
        this.service.success('REGISTRO EXITOSO', 'Informacion', {position: SnotifyPosition.rightTop});
        this.closeModal();
        return;
      });
      this.service.error('Ocurrio un error', 'Informacion', {position: SnotifyPosition.rightTop});

    }


  }

  add() {
      if (this.validateForm){
        const salaRequest: any = {
          edificio: this.form.get('edificio').value,
          nombre: this.form.get('nombre').value,
          estado: this.form.get('estado').value
        };

        this._ServicioSala.add(salaRequest)
        .subscribe(resp => {
          this.service.success('REGISTRO EXITOSO', 'Informacion', {position: SnotifyPosition.rightTop});
          this.closeModal();
          return;
        });
        this.service.error('Ocurrio un error', 'Informacion', {position: SnotifyPosition.rightTop});


      }



  }

  delete(sala: any){
    this.service.error('Seguro desea borrar', sala.nombre, {
      timeout: 50000,
      position: SnotifyPosition.rightTop,
      showProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      buttons: [
        {text: 'No', action: (toast) => this.service.remove(toast.id)},
        {text: 'Si', action: () =>

        this._ServicioSala.

        , bold: false},
      ]
    });
  }

  validateForm(): boolean{
    if (this.form.valid) {
      // this.service.success('REGISTRO EXITOSO', 'Informacion', {position: SnotifyPosition.rightTop});
      return true;
    }
    this.service.error('Datos inconsistentes...', 'Información', {position: SnotifyPosition.rightTop});
    return false;
  }


  closeModal(){
    this.botonCerrar.nativeElement.click();
    this.Actualizar = false;
    this.form.reset();
  }


  get nombre(){return this.form.get('nombre'); }
  get edificio(){return this.form.get('edificio'); }
  get estado(){return this.form.get('estado'); }

}
