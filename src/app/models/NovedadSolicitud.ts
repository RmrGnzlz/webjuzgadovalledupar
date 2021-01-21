import { BaseModel } from './Base/Base.Model';
import { EstadoNovedadSolicitud } from './Enums/EstadoNovedadesSolicitudEnums';
import { SolicitudAudienciaResponse } from './SolicitudAudiencia';
export class NovedadSolicitud extends BaseModel{
  public asunto:string;
  public descripcion:String;
  public fecha: Date;
  public estado:EstadoNovedadSolicitud
  public solicitudAudienciaKey:number;
  public solocitudAudiencia:SolicitudAudienciaResponse;

}


