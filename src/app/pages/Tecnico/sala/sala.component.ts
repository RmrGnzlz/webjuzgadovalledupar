import { EstadoSalaEnum, Sala } from './../../../models/Sala.Model';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { IHeaderTemplate, IInformationTemplate } from 'src/app/components/tabla-component/tabla-component.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EdificioService } from '../../../Service/Edificio/edificio.service';
import { SalaService } from '../../../Service/Sala/sala.service';
import { Edificio } from 'src/app/models/Edificio.Model';
import { SnotifyPosition, SnotifyService } from 'ng-snotify';
import { TipoSalaEnum, PlataformaEnum, SalaFisica, SalaVirtual } from '../../../models/Sala.Model';
import { disable } from '@rxweb/reactive-form-validators';



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

  @ViewChild('botonCerrar', { static: false }) botonCerrar: ElementRef;
  @ViewChild('rows') rows: TemplateRef<any>;
  headerSala: IHeaderTemplate[];
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
    this.loadSala();
    this.buildForm();
    this.setSalaTipoValidator();
    this.LoadEnums();


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




  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit(): void {
    this.headerSala = [
      { value: 'key', text: 'Codigo', templateRef: undefined },
      { value: 'edificio.nombre', text: 'Edificio', templateRef: this.rows },
      { value: 'nombre', text: 'Sala', templateRef: undefined },
      { value: 'tipo', text: 'Tipo', templateRef: this.rows },
      { value: 'estado', text: 'Estado', templateRef: this.rows },
      { value: 'opciones', text: 'Opciones', templateRef: this.rows },
    ];
  }

  ShowSala(element) {
    console.log(element);
    this.Actualizar = true;
    this.form.patchValue(element);
    this.edificio.setValidators(null);
    this.tipo.setValidators(null);



    // this._ServicioSala.getId(element.key, element.tipo)
    // .subscribe((res: any) => {
    //   if (res.data.tipo == 0){
    //     this.link.setValue(res.data.link);
    //     this.plataforma.setValue(res.data.plataforma);
    //   }
    //   if (res.data.tipo == 1) {
    //     this.piso.setValue(res.data.piso);
    //     this.numero.setValue(res.data.numero);
    //   }
    // });

    this.tipo.updateValueAndValidity();
    this.edificio.updateValueAndValidity();

  }

  loadSala() {
    this._ServicioSala.GetAll().subscribe((res: any) => {
      this.ListaSalas = res.data;
      console.log(res.data);


    },
      err => console.log('error al traer SALAS'));
  }

  Update() {

    if (this.validateForm) {
      const salaRequest: any = {
        id: + this.form.get('key').value,
        nombre: this.form.get('nombre').value,
        estado: + this.form.get('estado').value,
        edificiokey: 1
      };
      this._ServicioSala.Update(salaRequest)
        .subscribe((res: any) => {
          this.service.success(res.mensaje, 'Información', { position: SnotifyPosition.rightTop });
          this.closeModal();
          this.loadSala();
          return;
        }, err => {this.service.error(err.error.mensaje, 'Error', { position: SnotifyPosition.rightTop });

      });


    }


  }

  add() {

    if (this.validateForm) {

      if (this.tipo.value == TipoSalaEnum.Fisica) {
        const salaFisica = new SalaFisica();
        salaFisica.nombre = this.nombre.value;
        salaFisica.edificioKey = this.edificio.value;
        salaFisica.estado = +this.estado.value;
        salaFisica.numero = this.numero.value;
        salaFisica.piso = this.piso.value;

        this._ServicioSala.addSalaFisica(salaFisica)
          .subscribe(resp => {
            this.service.success('REGISTRO EXITOSO', 'Informacion', { position: SnotifyPosition.rightTop });
            this.closeModal();
            this.loadSala();
            return;
          },
            err => { console.log(err);
                     this.service.error(err.error.mensaje, 'Informacion', { position: SnotifyPosition.rightTop }); });

      } else {
        const salaVirtual = new SalaVirtual();
        salaVirtual.nombre = this.nombre.value;
        salaVirtual.edificioKey = this.edificio.value;
        salaVirtual.estado = +this.estado.value;
        salaVirtual.link = this.link.value;
        salaVirtual.plataforma = this.plataforma.value;
        console.log(salaVirtual);
        this._ServicioSala.addSalaVirtual(salaVirtual)
          .subscribe(resp => {
            this.service.success('REGISTRO EXITOSO', 'Informacion', { position: SnotifyPosition.rightTop });
            this.closeModal();
            this.loadSala();
            return;
          },
          err => {this.service.error(err.error.mensaje, 'Informacion', { position: SnotifyPosition.rightTop }); });
      }

    }



  }

  delete(sala: any) {
    console.log(sala);

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
            this._ServicioSala.Delete(sala.key)
              .subscribe(res => {
                this.service.success('Sala eliminada', { position: SnotifyPosition.rightTop });
                this.loadSala();
              }, err => this.service.error('Error al eliminar sala', { position: SnotifyPosition.rightTop }))
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

}
