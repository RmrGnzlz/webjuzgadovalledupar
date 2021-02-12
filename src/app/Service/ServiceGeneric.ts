import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { ResponseHttp } from 'src/app/models/Base/ResponseHttp';

interface QueryParams {
  [key: string]: string | number;
}

@Injectable({
  providedIn: 'root'
})

export class ServicieGeneric{
  private readonly END_POINT: string;
  constructor(private readonly http: HttpClient){
    this.END_POINT = environment.URL_SERVICIO;
  }

  private correctFormatForQueryUrl(qp: QueryParams): string{
      if (qp === null) { return ''; }
      const qpAsStr = this.mapQueryParamsToUrl(qp);
      return qpAsStr.length === 0 ? '' : `?${qpAsStr.join('&')}`;

  }
  private mapQueryParamsToUrl(qp: QueryParams): Array<string> {
    return Object.keys(qp).map((key: string) => {
      return `${key}=${qp[key]}`;
    });
  }

  getRemove<returnType>(
    id: string | null | number,
    route: string,
    qp: QueryParams = {},
    method: 'get' | 'delete' = 'get'
  ): Observable<returnType> {
    const cfqu = this.correctFormatForQueryUrl(qp);
    return this.http[method](
      `${this.END_POINT}${route}${id ? '/' + id : ''}${cfqu}`
    ) as Observable<returnType>;
  }

  // myGetRemove<T>(
  //   id:string | number | null,
  //   route:string,
  //   metodo:any
  //   ):T | T[]{
  //     console.log('mygetremove');

  // this.getRemove<ResponseHttp<T>>(id,route,metodo)
  // .pipe(map(data=>{
  //   return data.data;
  // })
  // ).subscribe(res=>{
  //   res.
  // })
  // return null;
  // }

  postPatch<returnType>(
    route: string,
    data: any,
    id: number = null,
    method: 'post' | 'put' = 'post',
    qp: QueryParams = {}
  ): Observable<returnType> {
    const cfqu = this.correctFormatForQueryUrl(qp);
    return this.http[method](
      `${this.END_POINT}${route}${id ? '/' + id : ''}${cfqu}`,
      data
    ) as Observable<returnType>;
  }

  // myPostpatch<T>(
  //   entidad:T,
  //   route:string,
  //   metodo:any
  //   ):T
  //   {
  //     this.postPatch<ResponseHttp<T>>(route,entidad,null,metodo)
  //     .pipe(map(data=>{
  //       return data.data;
  //     }),
  //     )
  //   return null;

  // }




}
