import { Sala } from './../../models/Sala.Model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable, of } from 'rxjs';
import {environment} from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SalaService {

  UrlGeneral =  environment.URL_SERVICIO + 'sala';

  constructor(private http: HttpClient) {

   }

   getId(id: number){
    return  this.http.get(`${this.UrlGeneral}/${id}`)
    .pipe(
      map((resp: any) => {
        return resp.data;
      })
    );


  }

   addSalaFisica(salaRequest: any){
    return this.http.post(`${this.UrlGeneral}/fisica`, salaRequest);
   }

   addSalaVirtual(salaRequest: any){
    return this.http.post(`${this.UrlGeneral}/virtual`, salaRequest);
   }

   GetAll(): Observable<Sala[]>{
  return this.http.get<Sala[]>(this.UrlGeneral)
    .pipe(
      map((resp: any) => {
        return resp.data;
      })
    );

  }


  UpdateSalaFisica(salaRequest: any){
    console.log(salaRequest);
    return this.http.put(`${this.UrlGeneral}/${salaRequest.id}`, salaRequest);
  }
  UpdateSalaVirtual(salaRequest: any){
    console.log(salaRequest);
    return this.http.put(`${this.UrlGeneral}/${salaRequest.id}`, salaRequest);
  }

  Delete(id: number){
    console.log('sala: ' + id);

    return this.http.delete(`${this.UrlGeneral}/${id}`);
  }




}
