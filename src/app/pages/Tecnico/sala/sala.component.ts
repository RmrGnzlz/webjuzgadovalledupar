import { ServicieGeneric } from './../../../Service/ServiceGeneric';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { EstadoSalaEnum, Sala } from './../../../models/Sala.Model';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EdificioService } from '../../../Service/Edificio/edificio.service';
import { SalaService } from '../../../Service/Sala/sala.service';
import { Edificio } from 'src/app/models/Edificio.Model';
import { SnotifyPosition, SnotifyService } from 'ng-snotify';
import { TipoSalaEnum, PlataformaEnum, SalaFisica, SalaVirtual } from '../../../models/Sala.Model';
import { disable } from '@rxweb/reactive-form-validators';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';



@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.css']
})
export class SalaComponent implements OnInit {

  public configuration: Config;

  ListaEdificios: Edificio[] = [];
  ListaSalas: Sala[] = [];
  Estados: any[] = [];
  Tipos: any[] = [];
  Actualizar = false;
  form: FormGroup;
  formSubmitted = false;
  public Columns: Columns[];

  @ViewChild('botonCerrar', { static: false }) botonCerrar: ElementRef;
  @ViewChild('tipoTpl', { static: true }) tipoTpl: TemplateRef<any>;
  @ViewChild('estadoTpl', { static: true }) estadoTpl: TemplateRef<any>;
  @ViewChild('actionTpl', { static: true }) actionTpl: TemplateRef<any>;

  constructor(private _ServcioEdificio: EdificioService,
    private _ServicioSala: SalaService,
    private service: SnotifyService,
    private formBuilder: FormBuilder,
    private _ServiceGeneric: ServicieGeneric) {
  }




  ngOnInit() {


    this._ServcioEdificio.GetAll().subscribe((res: any) => {
      this.ListaEdificios = res.data;
    },
      err => console.log('error al traer edificios')
    );
    this.buildForm();
    this.setSalaTipoValidator();
    this.LoadEnums();
    this.Columns = [
      { key: 'key', title: '#' },
      { key: 'edificio.nombre', title: 'Edificio' },
      { key: 'nombre', title: 'Sala' },
      { key: 'tipo', title: 'Tipo', cellTemplate: this.tipoTpl },
      { key: 'estado', title: 'Estado', cellTemplate: this.estadoTpl },
      { key: 'opciones', title: 'Opciones', cellTemplate: this.actionTpl },
    ];

    this.configuration = { ...DefaultConfig };
    this.loadSala();

  }

  LoadEnums() {
    for (const item in EstadoSalaEnum) {
      if (isNaN(Number(item))) {
        this.Estados.push({ text: item, value: EstadoSalaEnum[item] });
      }
    }

    for (const item in TipoSalaEnum) {
      if (isNaN(Number(item))) {
        this.Tipos.push({ text: item, value: TipoSalaEnum[item] });
      }
    }

  }

  buildForm() {
    this.form = this.formBuilder.group({
      key: [''],
      nombre: ['', [Validators.minLength(4)]],
      estado: ['', [Validators.required]],
      edificio: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      plataforma: ['Microsoft Teams', [Validators.required, Validators.minLength(5)]],
      link: ['', [Validators.required]],
      numero: [''],
      piso: ['', [Validators.required]]
    });
  }

  setSalaTipoValidator() {
    const plataformaControl = this.form.get('plataforma');
    const linkControl = this.form.get('link');
    const pisoControl = this.form.get('piso');

    this.form.get('tipo').valueChanges
      .subscribe(tip => {

        if (tip == TipoSalaEnum.Fisica || tip === '') {
          pisoControl.setValidators([Validators.required, Validators.minLength(1)]);
          linkControl.setValidators(null);
          plataformaControl.setValidators(null);

        }
        if (tip == TipoSalaEnum.Virtual) {
          pisoControl.setValidators(null);
          linkControl.setValidators([Validators.required, Validators.minLength(10)]);
          plataformaControl.setValidators([Validators.minLength(1), Validators.required]);
        }

        pisoControl.updateValueAndValidity();
        linkControl.updateValueAndValidity();
        plataformaControl.updateValueAndValidity();
      });
  }



  ShowSala(element: any) {
    this.Actualizar = true;
    this.form.patchValue(element);
    this.edificio.setValidators(null);
    this.tipo.setValidators(null);
    this._ServicioSala.getId(element.key).toPromise()
      .then((res) => {

        if (res.tipo === 0) {
          this.link.setValue(res.link);
          this.plataforma.setValue(res.plataforma);
        }
        if (res.tipo === 1) {
          this.piso.setValue(res.piso);
          this.numero.setValue(res.numero);
        }

      });
    this.form.updateValueAndValidity();
  }

  loadSala() {
    this._ServiceGeneric.getRemove<Sala[]>(null, 'sala')
      .subscribe({
        next: (res: any) => {
          this.ListaSalas = res.data;
        },
        error: console.error

      });
  }

  Update() {
    if (this.validateForm) {

      if (this.tipo.value == TipoSalaEnum.Fisica) {
        // tslint:disable-next-line: max-line-length
        const salaFisica = new SalaFisica(this.nombre.value, +this.estado.value, this.edificio.value, this.numero.value, this.piso.value);
        salaFisica.key = this.key.value;
        this.PeticionPostYPut(SalaFisica, 'fisica', 'put');
        return;
      } else {
        // tslint:disable-next-line: max-line-length
        const salaVirtual = new SalaVirtual(this.nombre.value, +this.estado.value, this.edificio.value, this.link.value, this.plataforma.value);
        salaVirtual.key = this.key.value;
        this.PeticionPostYPut(salaVirtual, 'virtual', 'put');
        return;
      }

    }


  }

  PeticionPostYPut(sala: any, tipo: string, metodo: any) {
    // tslint:disable-next-line: max-line-length
    this._ServiceGeneric.postPatch<any>(`sala/${tipo}`, sala, null, metodo)
      .subscribe(res => {
        this.service.success('Transacción exitosa', 'Información', { position: SnotifyPosition.rightTop });
        this.closeModal();
        this.loadSala();
      },
        err => this.service.error(err.error.mensaje, 'Información', { position: SnotifyPosition.rightTop }));

  }

  add() {

    if (this.validateForm) {

      if (this.tipo.value == TipoSalaEnum.Fisica) {
        // tslint:disable-next-line: max-line-length
        const salaFisica = new SalaFisica(this.nombre.value, +this.estado.value, this.edificio.value, this.numero.value, this.piso.value);
        this.PeticionPostYPut(salaFisica, 'fisica', 'post');
        return;
      } else {
        // tslint:disable-next-line: max-line-length
        const salaVirtual = new SalaVirtual(this.nombre.value, +this.estado.value, this.edificio.value, this.link.value, this.plataforma.value);
        this.PeticionPostYPut(salaVirtual, 'virtual', 'post');
        return;
      }

    }



  }

  delete(sala: any) {
    this.service.error('Seguro desea borrar', sala.nombre, {
      timeout: 50000,
      position: SnotifyPosition.rightTop,
      showProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      buttons: [
        { text: 'No', action: (toast) => this.service.remove(toast.id) },
        {
          text: 'Si', action: () =>

            this._ServiceGeneric.getRemove<any>(sala.key, 'sala', null, 'delete')
              .subscribe({
                next: (p: unknown) => {
                  this.service.success('Registro eliminado', 'Información', { position: SnotifyPosition.rightTop });
                  this.loadSala();
                },
                error: console.error
              })
        },
      ]
    });
  }

  validateForm(): boolean {
    if (this.form.valid) {
      // this.service.success('REGISTRO EXITOSO', 'Informacion', {position: SnotifyPosition.rightTop});
      return true;
    }
    this.service.error('Datos inconsistentes...', 'Información', { position: SnotifyPosition.rightTop });
    return false;
  }



  closeModal() {
    this.botonCerrar.nativeElement.click();
    this.Actualizar = false;
    this.form.reset();
  }


  get nombre() { return this.form.get('nombre'); }
  get edificio() { return this.form.get('edificio'); }
  get estado() { return this.form.get('estado'); }
  get tipo() { return this.form.get('tipo'); }
  get plataforma() { return this.form.get('plataforma'); }
  get link() { return this.form.get('link'); }
  get piso() { return this.form.get('piso'); }
  get numero() { return this.form.get('numero'); }
  get key() { return this.form.get('key'); }


}
