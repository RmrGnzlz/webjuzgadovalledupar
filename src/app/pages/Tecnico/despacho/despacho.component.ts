import { EdificioService } from './../../../Service/Edificio/edificio.service';
import { DespachoService } from './../../../Service/despacho/despacho.service';
import { Despacho, EstadoDespacho } from './../../../models/Despacho.Model';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SnotifyPosition, SnotifyService } from 'ng-snotify';
import { IHeaderTemplate, IInformationTemplate } from 'src/app/components/tabla-component/tabla-component.component';
import { Edificio } from 'src/app/models/Edificio.Model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-despacho',
  templateUrl: './despacho.component.html',
})
export class DespachoComponent implements OnInit {
  @ViewChild('botonCerrar', { static: false }) botonCerrar: ElementRef;
  @ViewChild('rows') rows: TemplateRef<any>;
  headerDespacho: IHeaderTemplate[];
  informationTable: IInformationTemplate = { title: 'Despachos', subTitle: 'Gestion de despachos' };
  ListaDespachos: Despacho[] = [];
  ListaEdificios: Edificio[] = [];
  Estados: any[] = [];

  form: FormGroup;
  Actualizar = false;
  formSubmitted = false;




  // private toastr: ToastrService,
  constructor(private service: SnotifyService,
    private formBuilder: FormBuilder,
    private _servicioDespacho: DespachoService,
    private _ServcioEdificio: EdificioService) { }

  ngOnInit(): void {
    this._ServcioEdificio.GetAll().subscribe((res: any) => {
      this.ListaEdificios = res.data;
    },
      err => console.log('error al traer edificios')
    );

    this.buildForm();

    for (const item in EstadoDespacho) {
      if (isNaN(Number(item))) {
        this.Estados.push({ text: item, value: EstadoDespacho[item] });
      }
    }
  }
  ngAfterViewInit(): void {
    this.headerDespacho = [
      { value: 'key', text: 'Codigo', templateRef: undefined },
      { value: 'nombre', text: 'Nombre', templateRef: undefined },
      { value: 'edificio.nombre', text: 'Edificio', templateRef: this.rows },
      { value: 'telefono', text: 'Telefono', templateRef: undefined },
      { value: 'estado', text: 'Estado', templateRef: this.rows },
      { value: 'opciones', text: 'Opciones', templateRef: this.rows },
    ];
  }
  buildForm() {
    this.form = this.formBuilder.group({
      key: [''],
      nombre: ['', [Validators.required, Validators.minLength(4)]],
      estado: ['', [Validators.required]],
      edificio: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern(/^[1-9]\d{6,10}$/), Validators.minLength(7)]]
    });
  }

  delete(element) {
    this._servicioDespacho.Delete(element.id)
    .subscribe(resp => {
      this.service.success('Registro eliminado', 'INFORMACIÓN', { position: SnotifyPosition.rightTop });
    }, err => this.service.error('Error al eliminar', 'INFORMACIÓN', { position: SnotifyPosition.rightTop }));

  }

  showDespacho(element) {

  }

  ShowModal() {

  }
  loadDespacho() {
    this._servicioDespacho.GetAll()
      .subscribe(res => this.ListaDespachos = res),
      err => console.log('error al cargar despachos');

  }

  add() {
    if (this.validateForm()) {
      const despachoRequest: any={
        nombre : this.nombre.value,
        telefono: this.telefono.value,
        estado: +this.estado.value,
        edificioKey: +this.edificio.value
      }
      console.log(despachoRequest);

      this._servicioDespacho.add(despachoRequest)
        .subscribe(resp => {
          this.service.success('Registro exitoso', 'INFORMACIÓN', { position: SnotifyPosition.rightTop });
          this.closeModal();
          this.loadDespacho();
        }, err => {console.log(err);
         this.service.error(err.error.mensaje, 'INFORMACIÓN', { position: SnotifyPosition.rightTop });});
    }
  }


  Update() {
    // if (this.validateForm){
    //     const salaRequest: any = {
    //       id: + this.form.get('key').value,
    //       nombre: this.form.get('nombre').value,
    //       estado: + this.form.get('estado').value,
    //       edificiokey: 1
    //     };
    //     this._ServicioSala.Update(salaRequest)
    //     .subscribe(res => {
    //       this.service.success('ACTUALIZACIÓN EXITOSA', 'INFORMACIÓN', {position: SnotifyPosition.rightTop});
    //       this.closeModal();
    //       this.loadSala();
    //       return;
    //     }, err => this.service.error('Ocurrio un error', 'Informacion', {position: SnotifyPosition.rightTop}));


    //   }


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
  get telefono() { return this.form.get('telefono'); }

}
