import { Injectable } from '@angular/core';
import { SnotifyPosition, SnotifyService } from 'ng-snotify';

@Injectable({
  providedIn: 'root'
})
export class NotificacionServiceService {
  confirmar: boolean;

  constructor(private service: SnotifyService) { }

  public MensajeSuccess(descripcion="Transacción exitosa",title="Exitoso!!"){
    this.service.success(descripcion, title, { position: SnotifyPosition.rightTop, titleMaxLength:title.length,bodyMaxLength:descripcion.length });
  }

  public MensajeInfo(descripcion="",title="Información!!"){
    this.service.info(descripcion, title, { position: SnotifyPosition.rightTop,titleMaxLength:title.length,bodyMaxLength:descripcion.length });
  }

  public MensajeError(descripcion="Ocurrio un error",title="Error!!"){
    this.service.error(descripcion, title, { position: SnotifyPosition.rightTop,titleMaxLength:title.length,bodyMaxLength:descripcion.length });
  }

  public MensajeConfir(elemento:string){

    return new Promise(resolve=>{
      this.service.error( elemento,'Seguro desea borrar',

      {
        timeout: 50000,
        titleMaxLength:20,
        bodyMaxLength:elemento.length,
        position: SnotifyPosition.rightTop,
        showProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        buttons: [
          { text: 'No', action: (toast) => {this.service.remove(toast.id);resolve(false);} },
          {
            text: 'Si', action: () =>{resolve(true);}

          },
        ]
      });
    });





  }

}
