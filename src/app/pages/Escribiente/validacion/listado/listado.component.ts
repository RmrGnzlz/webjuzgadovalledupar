import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { required } from '@rxweb/reactive-form-validators';
import { Columns } from 'ngx-easy-table';
import { ServicieGeneric } from 'src/app/Service/ServiceGeneric';
import { NotificacionServiceService } from 'src/app/utils/notificacion-service.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  @ViewChild('actionTpl', { static: true }) actionTpl: TemplateRef<any>;

  public Columns: Columns[];
  public data:any[];

  constructor(private readonly notificacion:NotificacionServiceService,
    private _serviceGeneric:ServicieGeneric) { }

  ngOnInit(): void {
    this.Columns = [
      { key: 'key', title: '#',width:"3%"},
      { key: 'Asunto', title: 'Asunto',width:"20%" },
      { key: 'Solicitante', title: 'Solicitante',width:"20%" },
      { key: 'proceso', title: 'Proceso',width:"20%" },
      { key: 'estado', title: 'Fecha'},
      { key: 'estado', title: 'Estado'},
      { key: 'opciones', title: 'Opciones',cellTemplate: this.actionTpl,width:"10%"},
    ];
    this.data=[
      {key:1,asunto:'solicitar audiencia ',proceso:'1241232311312312311223',estado:1},
      {key:2,asunto:'solicitar audiencia ',proceso:'1241232311312312311223',estado:0},
      {key:3,asunto:'solicitar audiencia ',proceso:'1241232311312312311223',estado:1},
      {key:5,asunto:'solicitar audiencia ',proceso:'1241232311312312311223',estado:0},
      {key:2,asunto:'solicitar audiencia ',proceso:'1241232311312312311223',estado:1},
    ]


  }



}
