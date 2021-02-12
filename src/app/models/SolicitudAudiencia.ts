import { BaseModel } from './Base/Base.Model';
import { Persona } from './Persona';
import { SujetosProcesales } from './Enums/TipoSujetosProcesalesEnum';
import { NovedadSolicitud } from './NovedadSolicitud';
import { Archivo } from './Archivo';
import { EstadoSolicitud } from './Enums/EstadoSolicitudEnum';
import { Proceso } from './Proceso';
export class SolicitudAudienciaResponse extends BaseModel{

  public radicado:string;
  public asunto:string;
  public descripcion:string;
  public creacion:Date;
  public tipoSolicitante: SujetosProcesales;
  public proceso:Proceso ;
  public solicitante: Persona;
  public novedadesSolicitud: NovedadSolicitud[];
  public archivo: Archivo ;
  public audienciaItems: any;
  public estado:EstadoSolicitud;

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


