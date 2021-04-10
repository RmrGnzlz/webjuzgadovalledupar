import { Component, OnInit } from '@angular/core';
import { Juzgado } from '../../../models/Juzgado.Model';
import { ServicieGeneric } from 'src/app/Service/ServiceGeneric';
import { ResponseHttp } from '../../../models/Base/ResponseHttp';

@Component({
  selector: 'app-asignacion-juzgado',
  templateUrl: './asignacion-juzgado.component.html',
  styleUrls: ['./asignacion-juzgado.component.css']
})
export class AsignacionJuzgadoComponent implements OnInit {

  constructor(private readonly _servicegeneric:ServicieGeneric) { }

  listaJuzgados:Juzgado[]=[];

  ngOnInit(): void {
    this._servicegeneric.getRemove<ResponseHttp<Juzgado>>(null,'juzgado')
    .subscribe(res=> this.listaJuzgados=res.data as Juzgado[]);
  }

}
