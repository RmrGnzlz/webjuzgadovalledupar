import { SolicitudAudienciaResponse } from '../../models/SolicitudAudiencia';
import { Component, OnInit } from '@angular/core';
import { NotificacionServiceService } from '../../utils/notificacion-service.service';
import { ServicieGeneric } from '../../Service/service.index';
import { EstadoSolicitud } from '../../models/Enums/EstadoSolicitudEnum';
import { SujetosProcesales } from '../../models/Enums/TipoSujetosProcesalesEnum';
import { EstadoNovedadSolicitud } from '../../models/Enums/EstadoNovedadesSolicitudEnums';
import { ResponseHttp } from '../../models/Base/ResponseHttp';

@Component({
  selector: 'app-consultar-solicitud',
  templateUrl: './consultar-solicitud.component.html',
  styleUrls: ['./consultar-solicitud.component.css']
})
export class ConsultarSolicitudComponent implements OnInit {

  public Radicado:string;
  public Solicitud:SolicitudAudienciaResponse;
  public existeSolicitud=false;

  constructor(private notificacion: NotificacionServiceService,
    private _ServiceGeneric: ServicieGeneric) { }
  ngOnInit(): void {
  }

  consultarSolicitud(){
    this._ServiceGeneric.getRemove<ResponseHttp<SolicitudAudienciaResponse>>(this.Radicado,`solicitud`)
    .subscribe((res:any)=>{
      this.existeSolicitud=true;
      this.Solicitud=res.data
      console.log(this.Solicitud);
    })
  }

  EstadoSolicitud(valor:any):string{
    return EstadoSolicitud[valor];
  }
  TipoSolicitante(valor:any):string{
    return SujetosProcesales[valor];
  }

  EstadoNovedad(valor:any):string{
    return EstadoNovedadSolicitud[valor];
  }

}
