import {  Component, OnInit } from '@angular/core';
import { Columns } from 'ngx-easy-table';

import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
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

  mapa:mapboxgl.Map;
  public ruta:'edificio';


  constructor( ) { }


  ngOnInit() {
    INIT_PLUGIN();
    

  }







}
