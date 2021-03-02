import { ServicieGeneric } from './../../../Service/ServiceGeneric';
import { Columns } from 'ngx-easy-table';
import {  Sala } from './../../../models/Sala.Model';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Edificio } from 'src/app/models/Edificio.Model';
import { TipoSalaEnum,  SalaFisica, SalaVirtual } from '../../../models/Sala.Model';
import { NotificacionServiceService } from 'src/app/utils/notificacion-service.service';
import { ResponseHttp } from '../../../models/Base/ResponseHttp';
import { EstadoGenerico } from '../../../models/Enums/EstadoGenerico';




@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.css']
})
export class SalaComponent implements OnInit {


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
  @ViewChild('numeroTpl', { static: true }) numeroTpl: TemplateRef<any>;
  @ViewChild('estadoTpl', { static: true }) estadoTpl: TemplateRef<any>;
  @ViewChild('actionTpl', { static: true }) actionTpl: TemplateRef<any>;

  constructor(
    private formBuilder: FormBuilder,
    private _ServiceGeneric: ServicieGeneric,
    private notificacion: NotificacionServiceService,
    ) {
  }




  ngOnInit() {

    // this.modal.mostrarModal();
    this._ServiceGeneric.getRemove<ResponseHttp<Edificio>>(null, 'edificio')
    .subscribe(res=>this.ListaEdificios=res.data as Edificio[]);

    this.buildForm();
    this.setSalaTipoValidator();
    this.LoadEnums();
    this.Columns = [
      { key: 'key', title: '#',cellTemplate: this.numeroTpl,width:'5' },
      { key: 'edificio.nombre', title: 'Edificio',width:'40' },
      { key: 'nombre', title: 'Sala',width:'40' },
      { key: 'tipo', title: 'Tipo', cellTemplate: this.tipoTpl,width:'10' },
      { key: 'estado', title: 'Estado', cellTemplate: this.estadoTpl,width:'10' },
      { key: 'opciones', title: 'Opciones', cellTemplate: this.actionTpl,width:'20' },
    ];


    // this.loadSala();

  }

  LoadEnums() {
    for (const item in EstadoGenerico) {
      if (isNaN(Number(item))) {
        this.Estados.push({ text: item, value: EstadoGenerico[item] });
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

    this._ServiceGeneric.getRemove<any>(element.key, 'sala').toPromise()
      .then((res) => {
        if (res.data.tipo === 0) {
          this.link.setValue(res.data.link);
          this.plataforma.setValue(res.data.plataforma);
        }
        if (res.data.tipo === 1) {
          console.log(res.data);
          this.piso.setValue(res.data.piso);
          this.numero.setValue(res.data.numero);
        }

      });
    this.form.updateValueAndValidity();
  }


  // loadSala() {
  //   this._ServiceGeneric.getRemove<Sala[]>(null, 'sala')
  //     .subscribe({
  //       next: (res: any) => {
  //         this.ListaSalas = res.data;
  //       },
  //       error: console.error

  //     });
  // }
  Update() {
    console.log('actualizarss');

    if (this.validateForm) {
      if (this.tipo.value == TipoSalaEnum.Fisica) {
        // tslint:disable-next-line: max-line-length
        const salaFisica = new SalaFisica(this.nombre.value, +this.estado.value, this.edificio.value, this.numero.value, this.piso.value);
        salaFisica.key = this.key.value;
        this.PeticionPostYPut(salaFisica, 'fisica', 'put');

      } else {
        // tslint:disable-next-line: max-line-length
        const salaVirtual = new SalaVirtual(this.nombre.value, +this.estado.value, this.edificio.value, this.link.value, this.plataforma.value);
        salaVirtual.key = this.key.value;
        this.PeticionPostYPut(salaVirtual, 'virtual', 'put');

      }

    }
  }

  PeticionPostYPut(sala: any, tipo: string, metodo: any) {
    this._ServiceGeneric.postPatch<any>(`sala/${tipo}`, sala, null, metodo)
      .subscribe(res => {
        console.log(res);
        this.notificacion.MensajeSuccess();
        this.closeModal();
        // this.loadSala();
      },
        err => this.notificacion.MensajeError);
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

  async delete(sala: any) {
    var res=await this.notificacion.MensajeConfir(sala.nombre);
    if (res) {
      this._ServiceGeneric.getRemove<any>(sala.key, 'sala', null, 'delete')
      .subscribe({
        next: (p: unknown) => {
          this.notificacion.MensajeSuccess("Registro eliminado","Exitoso")
          // this.loadSala();
        },
        error: console.error
      })
    }

  }

  validateForm(): boolean {
    if (this.form.valid) {
      // this.service.success('REGISTRO EXITOSO', 'Informacion', {position: SnotifyPosition.rightTop});
      return true;
    }
    this.notificacion.MensajeError('Datos inconsistentes...', 'Información');
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
