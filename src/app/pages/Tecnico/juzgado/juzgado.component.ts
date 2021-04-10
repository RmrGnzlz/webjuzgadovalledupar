import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Columns } from 'ngx-easy-table';
import { Juzgado } from 'src/app/models/Juzgado.Model';
import { Edificio } from 'src/app/models/Edificio.Model';
import { ServicieGeneric } from 'src/app/Service/service.index';
import { NotificacionServiceService } from '../../../utils/notificacion-service.service';
import { EstadoGenerico } from '../../../models/Enums/EstadoGenerico';
import { AreaServicio } from '../../../models/AreaServicio';
import { ResponseHttp } from '../../../models/Base/ResponseHttp';
import { forkJoin } from 'rxjs';
import { TablaComponent } from '../../../components/tabla/tabla.component';

@Component({
  selector: 'app-juzgados',
  templateUrl: './juzgado.component.html',
  styleUrls: []
})
export class JuzgadoComponent implements OnInit {

  @ViewChild(TablaComponent) tabla: TablaComponent;
  @ViewChild('actionTpl', { static: true }) actionTpl: TemplateRef<any>;
  @ViewChild('estadoTpl', { static: true }) estadoTpl: TemplateRef<any>;

  @ViewChild('botonCerrar', { static: false }) botonCerrar: ElementRef;


  public Columns: Columns[];
  listaJuzgado: Juzgado[] = [];
  ListaEdificios: Edificio[] = [];
  ListaAreas: AreaServicio[] = [];
  Estados: any[] = [];
  form: FormGroup;
  Actualizar = false;

  constructor(
    private formBuilder: FormBuilder,
    private _ServiceGeneric: ServicieGeneric,
    private notificacion: NotificacionServiceService
  ) { }

  ngOnInit(): void {
    let ObservableAreasServicio = this._ServiceGeneric.getRemove<ResponseHttp<AreaServicio>>(null, 'CentroServicio/All');
    let ObservableEdificios = this._ServiceGeneric.getRemove<ResponseHttp<Edificio>>(null, 'edificio');

    forkJoin([ObservableAreasServicio, ObservableEdificios])
      .subscribe(result => {
        this.ListaAreas = result[0].data as AreaServicio[];
        console.log(this.ListaAreas);
        this.ListaEdificios = result[1].data as Edificio[];
      })

    this.Columns = [
      { key: 'nombre', title: 'nombre', width: "20" },
      // { key: 'email', title: 'juez asignado' },
      { key: 'email', title: 'Correo', width: "10" },
      { key: 'telefono', title: 'Teléfono', width: "5" },
      { key: 'edificio.nombre', title: 'Edificio', width: "20" },
      { key: 'tipo', title: 'Tipo ', width: "10" },
      { key: 'estado', title: 'Estado', width: "10",cellTemplate:this.estadoTpl },
      { key: 'opciones', title: 'Opciones', cellTemplate: this.actionTpl, width: "5" },
    ];
    for (const item in EstadoGenerico) {
      if (isNaN(Number(item))) {
        this.Estados.push({ text: item, value: EstadoGenerico[item] });
      }
    }

    this.buildForm();

  }

  buildForm() {
    this.form = this.formBuilder.group({
      key: [''],
      nombre: ['', [Validators.required, Validators.minLength(4)]],
      estado: [EstadoGenerico.Activo],
      areaKey: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      edificioKey: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(7), Validators.maxLength(10)]]
    });
  }

  add() {
    if (this.form.valid) {
      console.log(this.form.value);

      this._ServiceGeneric.postPatch<ResponseHttp<Juzgado>>('juzgado', this.form.value, null, 'post')
        .subscribe(res => {
          this.notificacion.MensajeSuccess(res.message);
          this.closeModal();
          this.tabla.getDataApi('');
        });

    } else {
      this.form.markAllAsTouched();
      this.notificacion.MensajeInfo("Datos incompletos");
    }
  }
  showJuzgado(juzgado: Juzgado) {
    this.Actualizar = true;
    this.form.patchValue(juzgado);
    this.edificio.setValue(juzgado.edificio.key);
    this.tipo.setValue(juzgado.tipo);
    this.key.setValidators(Validators.required);
    this.estado.setValidators(Validators.required);
    this.form.updateValueAndValidity();
  }

  updateState(key: number, status: boolean) {
    var estado = status ? 1 : 0;
    this._ServiceGeneric.postPatch(`usuario/estado`, { key, estado }, null, 'put')
      .subscribe(res => {
        this.notificacion.MensajeSuccess("Estado Actualizado");
        // this.loadEmpleados();
      })

  }

  async delete(element: any, rowIndex: number) {
    var res = await this.notificacion.MensajeConfir(element?.nombre);

    if (res) {
      this._ServiceGeneric.getRemove<ResponseHttp<Juzgado>>(element?.key, 'juzgado', null, 'delete')
        .subscribe({
          next: (p: unknown) => {
            this.notificacion.MensajeSuccess("juzgado eliminado");
            this.tabla.data = [...this.tabla.data.filter((_v, k) => k !== rowIndex)];
          }
        })
    }
  }

  update() {
    if (this.form.valid) {
      console.log(this.form.value);
      this._ServiceGeneric.postPatch<any>('juzgado', this.form.value, null, 'put')
        .subscribe(res => {
          this.notificacion.MensajeSuccess();
          this.closeModal();
         this.tabla.getDataApi('');
        });
    } else {
      this.notificacion.MensajeInfo("formulario invalido!!");
    }
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
  get tipo() { return this.form.get('areaKey'); }
  get email() { return this.form.get('email'); }
  get edificio() { return this.form.get('edificioKey'); }
  get telefono() { return this.form.get('telefono'); }
}
