import { SalaResponse } from './../../models/Sala.Model';
import { EdificioModel } from './../../models/EdificioModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalaService {

  UrlGeneral =  environment.URL_SERVICIO + 'sala';

  constructor(private http: HttpClient) {

   }

   add(nombre: string , edificio: number){
    return this.http.post(this.UrlGeneral, {nombre, edificio});
   }
  GetAll(): Observable<SalaResponse[]>{
  return this.http.get<SalaResponse[]>(this.UrlGeneral);
  }


}
