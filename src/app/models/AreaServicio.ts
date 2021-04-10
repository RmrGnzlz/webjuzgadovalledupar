import { BaseModel } from './Base/Base.Model';
import { CentroServicio } from './CentroServicio';
import { TipoAreaServicio } from './Enums/TipoAreaServicio';
import { EstadoGenerico } from './Enums/EstadoGenerico';
export class AreaServicio extends BaseModel{

  public centroServicio: CentroServicio;
  public centroServicioKey:number;
  public tipo:TipoAreaServicio;
  public estado:EstadoGenerico;

  get stringTipo():string{
    return TipoAreaServicio[this.tipo];
  }

  public stringEstado(){
    return EstadoGenerico[this.estado];
  }

}
