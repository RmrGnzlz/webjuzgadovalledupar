import { EdificioModel } from './../../models/EdificioModel';
import { SalaModel } from './../../models/Sala.Model';
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

  add(sala: SalaModel){
    return this.http.post(this.UrlGeneral, sala);
  }

  GetAll(): Observable<SalaModel[]>{
  return this.http.get<SalaModel[]>(this.UrlGeneral);
  }


}
