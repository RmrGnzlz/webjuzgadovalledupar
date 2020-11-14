import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EdificioService {

  url = environment.URL_SERVICIO + `edificio`;
  constructor(private http: HttpClient) { }

  GetAll() {
    return this.http.get(this.url);
  }


}
