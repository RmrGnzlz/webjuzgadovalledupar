import { Despacho } from './../../models/Despacho.Model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DespachoService {

  UrlGeneral =  environment.URL_SERVICIO + 'despacho';
  constructor(private http: HttpClient) { }

  add(DespachoRequest: Despacho){
    console.log(DespachoRequest);

    return this.http.post(this.UrlGeneral, DespachoRequest);
   }

   Update(DespachoRequest: Despacho){
    return this.http.put(this.UrlGeneral, DespachoRequest);
   }

   Delete(key: number){
     console.log(key);

     return this.http.delete(`${this.UrlGeneral}/${key}`);
   }

   GetAll(): Observable<Despacho[]>{
     return this.http.get<Despacho[]>(this.UrlGeneral)
     .pipe(
       map((res: any) => {
         return res.data;
       })
     );
   }

}
