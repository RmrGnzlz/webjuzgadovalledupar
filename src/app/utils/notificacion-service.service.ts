import { Injectable } from '@angular/core';
import { SnotifyPosition, SnotifyService } from 'ng-snotify';

@Injectable({
  providedIn: 'root'
})
export class NotificacionServiceService {
  confirmar: boolean;

  constructor(private service: SnotifyService) { }

  public MensajeSuccess(descripcion="Transacción exitosa",title="Exitoso!!"){
    console.log("hola");

    this.service.success(descripcion, title, { position: SnotifyPosition.rightTop });
  }

  public MensajeInfo(descripcion="",title="Información!!"){
    this.service.info(descripcion, title, { position: SnotifyPosition.rightTop });
  }

  public MensajeError(descripcion="Ocurrio un error",title="Error!!"){
    this.service.error(descripcion, title, { position: SnotifyPosition.rightTop });
  }

  public MensajeConfir(elemento:string){

    return new Promise(resolve=>{
      this.service.error( elemento,'Seguro desea borrar', {
        timeout: 50000,
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
