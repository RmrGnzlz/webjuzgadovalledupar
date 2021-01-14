import { BaseModel } from './Base/Base.Model';
import { Persona } from './Persona';
import { SujetosProcesales } from './Enums/TipoSujetosProcesalesEnum';
import { NovedadSolicitud } from './NovedadSolicitud';
import { Archivo } from './Archivo';
import { EstadoSolicitud } from './Enums/EstadoSolicitudEnum';
import { Proceso } from './Proceso';
export class SolicitudAudiencia extends BaseModel{

  public radicado:string;
  public asunto:string;
  public descripcion:string;
  public creacion:string;
  public tipoSolicitante: SujetosProcesales;
  public procesoKey:number;
  public proceso:Proceso | string;
  public solicitanteKey:number;
  public solicitante: Persona;
  public novedadSolicitud: NovedadSolicitud[];
  public archivo: Archivo | File;
  public audienciaItems: any;
  public estadoSolicitud:EstadoSolicitud;

}
export class SolicitudAudienciaRequest {
  public asunto:string;
  public descripcion:string;
  public proceso:string;
  public tipoSolicitante:SujetosProcesales;
  public archivo: File;
  public solicitante: string;
  public ListadoAudiencia:any[];


}


