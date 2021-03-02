import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Columns } from 'ngx-easy-table';
import { Juzgado, TipoAreaEnum } from 'src/app/models/Juzgado.Model';
import { Edificio } from 'src/app/models/Edificio.Model';
import { ServicieGeneric } from 'src/app/Service/service.index';
import { NotificacionServiceService } from '../../../utils/notificacion-service.service';
import { EstadoGenerico } from '../../../models/Enums/EstadoGenerico';

@Component({
  selector: 'app-juzgados',
  templateUrl: './juzgado.component.html',
  styleUrls: []
})
export class JuzgadoComponent implements OnInit {

  @ViewChild('actionTpl', { static: true }) actionTpl: TemplateRef<any>;
  @ViewChild('tipoTpl', { static: true }) tipoTpl: TemplateRef<any>;

  @ViewChild('botonCerrar', { static: false }) botonCerrar: ElementRef;


  public Columns: Columns[];
  listaJuzgado: Juzgado[] = [];
  ListaEdificios: Edificio[] = [];
  ListadoDespacho: any[] = [];

  Estados: any[] = [];
  Areas: any[] = [];

  form: FormGroup;
  Actualizar = false;


  constructor(
    private formBuilder: FormBuilder,
    private _ServiceGeneric: ServicieGeneric,
    private notificacion: NotificacionServiceService
  ) { }

  ngOnInit(): void {

    this.Columns = [
      { key: 'nombre', title: 'Juzgado' },
      { key: 'email', title: 'Correo' },
      { key: 'tipo', title: 'Tipo', cellTemplate:this.tipoTpl},
      { key: 'estado', title: 'Estado' },
      { key: 'opciones', title: 'Opciones', cellTemplate: this.actionTpl },
    ];
    for (const item in EstadoGenerico) {
      if (isNaN(Number(item))) {
        this.Estados.push({ text: item, value: EstadoGenerico[item] });
      }
    }
    for (const item in TipoAreaEnum) {
      if (isNaN(Number(item))) {
        this.Areas.push({ text: item, value: TipoAreaEnum[item] });
      }
    }

    this.listadoDespachoEdificio();

    this.buildForm();

  }

  buildForm() {
    this.form = this.formBuilder.group({
      key: [''],
      nombre: ['', [Validators.required, Validators.minLength(4)]],
      estado: [EstadoGenerico.Activo],
      tipo: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      despacho: ['', [Validators.required]]
    });
  }
  add() {
    if (this.form.valid) {
      const juzgado = new Juzgado(this.nombre.value, this.email.value, +this.despacho.value, +this.tipo.value, +this.estado.value);
      this._ServiceGeneric.postPatch<any>('juzgado', juzgado, null, 'post')
        .subscribe(res => {
         this.notificacion.MensajeSuccess();
         this.closeModal();
        //  this.cargarJuzgado();
        },
          err => this.notificacion.MensajeError()
        );
    } else {
     this.notificacion.MensajeInfo("Datos incompletos");
    }
  }
  showJuzgado(juzgado: any) {
    this.Actualizar = true;
    this.form.patchValue(juzgado);
    this.despacho.setValue('');
    this.key.setValidators(Validators.required);
    this.estado.setValidators(Validators.required);
    this.form.updateValueAndValidity();
  }

  async delete(element: any) {
  var res=await this.notificacion.MensajeConfir(element.nombre);

    if(res){
      this._ServiceGeneric.getRemove<any>(element.key, 'juzgado', null, 'delete')
      .subscribe({
        next: (p: unknown) => {
         this.notificacion.MensajeSuccess;
          // this.cargarJuzgado();
        },
        error:this.notificacion.MensajeError
      })
    }
  }

  update() {
    if (this.form.valid) {
      const juzgadoRequest = new Juzgado(this.nombre.value, this.email.value, this.despacho.value, +this.tipo.value, +this.estado.value);
       juzgadoRequest.key=this.key.value;
      console.log(juzgadoRequest);


      this._ServiceGeneric.postPatch<any>('juzgado', juzgadoRequest, null, 'put')
        .subscribe(res => {
          this.notificacion.MensajeSuccess();
          this.closeModal();
          // this.cargarJuzgado();
        },
          err => this.notificacion.MensajeError());
    } else {
    this.notificacion.MensajeInfo("formulario invalido!!");
    }
  }
  listadoDespachoEdificio() {
    this._ServiceGeneric.getRemove<any>(null, 'despacho/PorEdificio')
    .subscribe({
      next: (res: any) => {
        this.ListadoDespacho = res.data;
        console.log(this.ListadoDespacho);
      },
      error: console.error
    });
  }
  closeModal() {
    this.botonCerrar.nativeElement.click();
    this.estado.setValidators(null);
    this.form.updateValueAndValidity();
    this.Actualizar = false;
    this.buildForm();
  }
  get nombre() { return this.form.get('nombre'); }
  get key() { return this.form.get('key'); }
  get estado() { return this.form.get('estado'); }
  get tipo() { return this.form.get('tipo'); }
  get email() { return this.form.get('email'); }
  get despacho() { return this.form.get('despacho'); }
}
