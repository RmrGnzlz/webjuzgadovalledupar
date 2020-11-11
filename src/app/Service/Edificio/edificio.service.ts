import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EdificioModel } from '../../models/EdificioModel';

@Injectable({
  providedIn: 'root'
})
export class EdificioService {

  url = environment.URL_SERVICIO + `edificio`;
  constructor(private htt: HttpClient) { }

  GetAll(): Observable<EdificioModel[]>{
    return this.htt.get<EdificioModel[]>(this.url);
  }


}
