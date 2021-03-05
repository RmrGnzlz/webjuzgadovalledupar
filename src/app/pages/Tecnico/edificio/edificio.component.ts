import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { required } from '@rxweb/reactive-form-validators';
import { Columns } from 'ngx-easy-table';
import { TablaComponent } from 'src/app/components/tabla/tabla.component';
import { Edificio } from '../../../models/Edificio.Model';

@Component({
  selector: 'app-edificio',
  templateUrl: './edificio.component.html',
  styleUrls: ['./edificio.component.css']
})
export class EdificioComponent implements OnInit {
  @ViewChild('actionTpl', { static: true }) actionTpl: TemplateRef<any>;
  @ViewChild('estadoTpl', { static: true }) estadoTpl: TemplateRef<any>;
  @ViewChild('botonCerrar', { static: false }) botonCerrar: ElementRef;

  public Columns: Columns[];
  form: FormGroup;
  Actualizar = false;
  @ViewChild(TablaComponent) tabla: TablaComponent;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.Columns = [
      { key: 'key', title: '#',width:"3%"},
      { key: 'nombre', title: 'Edificio',width:"10%" },
      { key: 'direccion', title: 'Direccion',width:"20%" },
      { key: 'estado', title: 'Estado', cellTemplate:this.estadoTpl,width:"10%"},
      { key: 'opciones', title: 'Opciones',cellTemplate: this.actionTpl,width:"10%"},
    ];
    this.buildForm();
  }
  buildForm() {
    this.form = this.formBuilder.group({
      key: [''],
      nombre: ['', [Validators.minLength(4),required]],
      direccion: ['', [Validators.minLength(4),required]],
      // estado: ['', [Validators.required]],
      // edificio: ['', [Validators.required]],
      // tipo: ['', [Validators.required]],
      // plataforma: ['Microsoft Teams', [Validators.required, Validators.minLength(5)]],
      // link: ['', [Validators.required]],
      // numero: [''],
      // piso: ['', [Validators.required]]
    });
  }

  ShowEdificio(edificio:Edificio){

  }

  delete(edificio:Edificio){

  }

  agregar(){

  }

  closeModal() {
    this.botonCerrar.nativeElement.click();
    this.Actualizar = false;
    this.form.reset();
  }

  get nombre() { return this.form.get('nombre'); }
  get direccion() { return this.form.get('direccion'); }
  get latitud() { return this.form.get('latitud'); }
  get longitud() { return this.form.get('longitud'); }

}
