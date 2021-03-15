import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { required } from '@rxweb/reactive-form-validators';
import { Columns } from 'ngx-easy-table';
import { TablaComponent } from 'src/app/components/tabla/tabla.component';
import { Edificio } from '../../../models/Edificio.Model';

import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../../environments/environment.prod';
import { NotificacionServiceService } from '../../../utils/notificacion-service.service';
import { ServicieGeneric } from '../../../Service/ServiceGeneric';
import { ResponseHttp } from '../../../models/Base/ResponseHttp';
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
  mapa:mapboxgl.Map;

  listaEdificios:Edificio[]=[];

  constructor(private formBuilder: FormBuilder,
              private readonly notificacion:NotificacionServiceService,
              private _serviceGeneric:ServicieGeneric) { }

  ngOnInit(): void {
    (mapboxgl as any).accessToken=environment.maxBoxKey;
    this.mapa= new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-73.2517184,10.4736129], // starting position
      zoom: 16 // starting zoom
      });
      this.crearMarcadorMarket(10.4736129,-73.2517184);

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
      latitud: [10.4736129, [Validators.required]],
      longitud: [-73.2517184, [Validators.required]],
    });
  }

  crearMarcadorMarket(lat: number, long:number){
    var marker = new mapboxgl.Marker({
      draggable: true
      })
      .setLngLat([long, lat])
      .addTo(this.mapa);

      marker.on('drag',()=>{
        this.latitud.setValue(marker.getLngLat().lat)
        this.longitud.setValue(marker.getLngLat().lng)
      })
  }

  cargarEdificios(){
    this._serviceGeneric.getRemove<ResponseHttp<Edificio>>(null,'edificio')
    .subscribe(res=>this.listaEdificios=res.data as Edificio[]);
  }


  ShowEdificio(edificio:Edificio){

  }

  delete(edificio:Edificio){

  }


  guardar(){
    if (this.form.invalid) {
      this.notificacion.MensajeError("Formulario Invalido");
      this.form.markAllAsTouched();
      return;
    }
    this._serviceGeneric.postPatch<ResponseHttp<Edificio>>('edificio',this.form.value)
    .subscribe(res=>{this.notificacion.MensajeSuccess('Edificio Agregado');this.closeModal()});
  }

  closeModal() {
    this.botonCerrar.nativeElement.click();
    this.Actualizar = false;
    var valoresIniciales:any={
      latitud: 10.4736129,
      longitud: -73.2517184
    }
    this.form.reset(valoresIniciales);
  }

  get nombre() { return this.form.get('nombre'); }
  get direccion() { return this.form.get('direccion'); }
  get latitud() { return this.form.get('latitud'); }
  get longitud() { return this.form.get('longitud'); }

}
