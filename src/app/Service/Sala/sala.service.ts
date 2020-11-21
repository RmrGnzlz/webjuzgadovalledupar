import { Sala } from './../../models/Sala.Model';
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

   add(salaRequest: any){
    return this.http.post(this.UrlGeneral, salaRequest);
   }

  GetAll(): Observable<Sala[]>{
  return this.http.get<Sala[]>(this.UrlGeneral);
  }

  Update(salaRequest: any){
    return this.http.put(this.UrlGeneral, salaRequest);
  }

  Delete(salaRequest: any){
    return this.http.delete(this.UrlGeneral, salaRequest);
  }


}
