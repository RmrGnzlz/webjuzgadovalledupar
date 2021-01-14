import { BaseModel } from './Base/Base.Model';
import { TipoArchivo } from './Enums/TipoArchivoEnum';
import { SolicitudAudiencia } from './SolicitudAudiencia';
export class Archivo extends BaseModel{
  public nombre:string;
  public tipo: TipoArchivo;
  public ruta: string;
  public solicitudAudiencia: SolicitudAudiencia;
  
}
