import { SalaResponse } from './../../models/Sala.Model';
import { map } from 'rxjs/operators';
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

  GetAll(edificio: string): Observable<SalaResponse[]>{

    const url = `${this.UrlGeneral}/salas/edificio/ ${edificio}`;
    return this.http.get(url)
    .pipe(
      map((res: any) => {
          return res.data;
      })
    );

  }

}
