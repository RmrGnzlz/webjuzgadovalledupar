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
    let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlRFQ05JQ08iLCJ1bmlxdWVfbmFtZSI6Ikx1Y2FzX0Nhc2lsbGFzIiwianRpIjoiNjYxNmEwMmItZmMxMC00OTJmLWJlZmMtYTMwMzA0YjZmYWVmIiwiZXhwIjoxNjE0MjEwNDQwLCJpc3MiOiJ5b3VyZG9tYWluLmNvbSIsImF1ZCI6InlvdXJkb21haW4uY29tIn0.pNS0pzuosImC4X5Ikm2QOK0oBdDJaui-D4-lapgI6zU"
    // localStorage.getItem('token');
    req = req.clone({
      setHeaders: {
        'Authorization':`Bearer ${token}`
      }
  } );

    return next.handle(req)
    .pipe(
      tap(event=>{
        if (event instanceof HttpResponse) console.log('solicitud exitosa');
      }),
      catchError(err=>{

        this.MensajeError(err);
        return of(err);

      })
    )
  }


  MensajeError(error: HttpErrorResponse){
      if (error.status==500) {
        this.notificacion.MensajeError("Error interno Servidor","Intente mas tarde");
      }
      if (error.status==400) {
        console.log(error.message);

        this.notificacion.MensajeError(error.error.message,"Error");
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
