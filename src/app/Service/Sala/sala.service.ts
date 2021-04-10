import { Sala } from './../../models/Sala.Model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable, of } from 'rxjs';
import {environment} from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SalaService {

  UrlGeneral =  environment.URL_SERVICIO + 'sala';

  private readonly BACKEND_URL =
  'https://my-json-server.typicode.com/ssuperczynski/ngx-easy-table/company?';

  constructor(private http: HttpClient) {

   }

   getCompanies(params = '', observe = true): Observable<HttpResponse<Company[]>> {
    return this.http.get<Company[]>(`${this.BACKEND_URL}${params}`, {
      observe: observe ? 'response' : null,
    });
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

export interface Company {
  email: string;
  company: string;
  eyeColor: string;
  age: number;
  balance: string;
  surname: string;
  name: string;
  id: number;
}
