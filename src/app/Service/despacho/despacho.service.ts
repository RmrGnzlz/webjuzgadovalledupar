import { Despacho } from './../../models/Despacho.Model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DespachoService {

  UrlGeneral =  environment.URL_SERVICIO + 'despacho';
  constructor(private http: HttpClient) { }

  add(DespachoRequest: Despacho){
    return this.http.post(this.UrlGeneral, DespachoRequest);
   }

   Update(DespachoRequest: Despacho){
    return this.http.put(this.UrlGeneral, DespachoRequest);
   }

   Delete(id: number){
    return this.http.delete(`${this.UrlGeneral}/id`);
   }

   GetAll():Observable<Despacho[]>{
     return this.http.get<Despacho[]>(this.UrlGeneral);
   }

}
