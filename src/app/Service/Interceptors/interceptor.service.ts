import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { NotificacionServiceService } from 'src/app/utils/notificacion-service.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor  {

  constructor(private notificacion: NotificacionServiceService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token=sessionStorage.getItem('token');
    // localStorage.getItem('token');
    req = req.clone({
      setHeaders: {
        'Authorization':`Bearer ${token}`
      }
  } );

    return next.handle(req)
    .pipe(
      tap(event=>{
      }),
      catchError(err=>{
        this.MensajeError(err);
        return of(err);

      })
    )
  }


  MensajeError(error: HttpErrorResponse){
      if (error.status==0) {
        this.notificacion.MensajeError("Error al conectar con el servidor","Intente mas tarde");
      }
      if (error.status==500) {
        this.notificacion.MensajeError("Error interno Servidor","Intente mas tarde");
      }
      if (error.status==400) {
        this.notificacion.MensajeError(error.error.message,"Error");
      }
      if (error.status==404) {
        console.log(error.error.message);

        this.notificacion.MensajeError(error.error.message)
      }
      if (error.status==401) {
        this.notificacion.MensajeError('No tiene permiso para esta petición')
      }

    return throwError('error personalizado')
  }


}



// intercept(
//   req: HttpRequest<any>,
//   next: HttpHandler
// ): Observable<HttpEvent<any>> {

//   return next.handle(req).pipe(
//       tap(evt => {
//           if (evt instanceof HttpResponse) {
//               if(evt.body && evt.body.success)
//                   this.toasterService.success(evt.body.success.message, evt.body.success.title, { positionClass: 'toast-bottom-center' });
//           }
//       }),
//       catchError((err: any) => {
//           if(err instanceof HttpErrorResponse) {
//               try {
//                   this.toasterService.error(err.error.message, err.error.title, { positionClass: 'toast-bottom-center' });
//               } catch(e) {
//                   this.toasterService.error('An error occurred', '', { positionClass: 'toast-bottom-center' });
//               }
//               //log error
//           }
//           return of(err);
//       }

//       ));

// }
