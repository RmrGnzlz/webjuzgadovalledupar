import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Edificio } from 'src/app/models/Edificio.Model';

@Injectable({
  providedIn: 'root'
})
export class EdificioService {

  url = environment.URL_SERVICIO + `edificio`;
  constructor(private htt: HttpClient) { }

  GetAll(): Observable<Edificio[]>{
    return this.htt.get<Edificio[]>(this.url);
  }


}
