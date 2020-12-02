import { ServicieGeneric } from './../../../Service/ServiceGeneric';
import { EdificioService } from './../../../Service/Edificio/edificio.service';
import { DespachoService } from './../../../Service/despacho/despacho.service';
import { Despacho, EstadoDespacho } from './../../../models/Despacho.Model';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SnotifyPosition, SnotifyService } from 'ng-snotify';
import { Edificio } from 'src/app/models/Edificio.Model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Columns } from 'ngx-easy-table';

@Component({
  selector: 'app-despacho',
  templateUrl: './despacho.component.html',
})
export class DespachoComponent implements OnInit {
  @ViewChild('botonCerrar', { static: false }) botonCerrar: ElementRef;
  @ViewChild('estadoTpl', { static: true }) estadoTpl: TemplateRef<any>;
  @ViewChild('actionTpl',{static:true}) actionTpl: TemplateRef<any>;
  ListaDespachos: Despacho[] = [];
  ListaEdificios: Edificio[] = [];
  Estados: any[] = [];
  public Columns: Columns[];
  form: FormGroup;
  Actualizar = false;
  formSubmitted = false;




  // private toastr: ToastrService,
  constructor(private service: SnotifyService,
    private formBuilder: FormBuilder,
    private _servicioDespacho: DespachoService,
    private _ServcioEdificio: EdificioService,
    private _ServiceGeneric: ServicieGeneric) { }



  ngOnInit(): void {

    this._ServcioEdificio.GetAll().subscribe((res: any) => {
      this.ListaEdificios = res.data;
    },
      err => console.log('error al traer edificios')
    );

    // this.loadDespachos();
    this.GetAllServiceGeneric();
    this.buildForm();


    for (const item in EstadoDespacho) {
      if (isNaN(Number(item))) {
        this.Estados.push({ text: item, value: EstadoDespacho[item] });
      }
    }
    this.Columns = [
      { key: 'key', title: '#' },
      { key: 'nombre', title: 'Despacho' },
      { key: 'edificio.nombre', title: 'Edificio' },
      { key: 'telefono', title: 'Telefono' },
      { key: 'estado', title: 'Estado', cellTemplate: this.estadoTpl },
      { key: 'opciones', title: 'Opciones',cellTemplate:this.actionTpl},
    ];
  }

  // METODOS GENERICOS

  GetAllServiceGeneric(){
    this._ServiceGeneric.getRemove<Despacho[]>(null,'despacho')
    .subscribe({
      next:(res:any)=>{
        console.log(res);

        this.ListaDespachos=res.data;
      },
      error : console.error

    });
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
    this.service.error('Seguro desea borrar', element.nombre, {
      timeout: 50000,
      position: SnotifyPosition.rightTop,
      showProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      buttons: [
        { text: 'No', action: (toast) => this.service.remove(toast.id) },
        {
          text: 'Si', action: () =>
          this._ServiceGeneric.getRemove<any>(element.key,'despacho',null,'delete')
          .subscribe({
            next:(p: unknown)=>{
              this.service.success('Registro eliminado', 'INFORMACIÓN', { position: SnotifyPosition.rightTop });
                this.loadDespachos();
            },
            error : console.error
          })
        },
      ]
    });

  }

  showDespacho(elemen:any) {
    this.Actualizar = true;
    this.form.patchValue(elemen)
    this.edificio.setValidators(null);
    this.form.updateValueAndValidity();
  }


  loadDespachos() {
    this._servicioDespacho.GetAll().subscribe(res => this.ListaDespachos = res,
      err => console.log(err));
  }

  add() {

    if (this.validateForm()) {

      this._ServiceGeneric.postPatch<any>('despacho',new Despacho(this.nombre.value,this.telefono.value,+this.estado.value,this.edificio.value),null,'post')
      .subscribe(res=>{
        this.service.success('Registro exitoso', 'Información', { position: SnotifyPosition.rightTop });
        this.closeModal();
        this.loadDespachos();
      },
      err=>this.service.error(err.error.mensaje, 'Información', { position: SnotifyPosition.rightTop }));

    }
  }


  Update() {
    if (this.validateForm){
        const DespachoRequest=new Despacho(this.nombre.value,this.telefono.value,+this.estado.value,this.edificio.value)
        DespachoRequest.key=this.key.value;

        this._ServiceGeneric.postPatch<any>('despacho',DespachoRequest,null,'put')
        .subscribe(res=>{
          this.service.success('Actualizacion exitosa', 'Información', { position: SnotifyPosition.rightTop });
          this.closeModal();
          this.loadDespachos();
        },
        err=>this.service.error(err.error.mensaje, 'Información', { position: SnotifyPosition.rightTop }));

      }


  }
  validateForm(): boolean {
    if (this.form.valid) {
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
  get key() { return this.form.get('key'); }

}
