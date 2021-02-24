import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Columns } from 'ngx-easy-table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SalaService } from '../Service/Sala/sala.service';
import { ServicieGeneric } from '../Service/service.index';
import { DataListado } from '../components/tabla/Interface/ListadoTablaInterface';
import { Edificio } from '../models/Edificio.Model';
declare function INIT_PLUGIN();
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  public columns: Columns[] = [
    { key: 'nombre', title: 'NOMBREss' },
    { key: 'direccion', title: 'DIRECCION' },
    { key: 'key', title: 'KEY' },
  ];

  public ruta:'edificio';


  constructor( ) { }


  ngOnInit() {
    INIT_PLUGIN();

  }







}
