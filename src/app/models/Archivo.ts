import { BaseModel } from './Base/Base.Model';
import { TipoArchivo } from './Enums/TipoArchivoEnum';
import { SolicitudAudienciaResponse } from './SolicitudAudiencia';
export class Archivo extends BaseModel{
  public nombre:string;
  public tipo: TipoArchivo;
  public ruta: string;
  public solicitudAudiencia: SolicitudAudienciaResponse;

}
