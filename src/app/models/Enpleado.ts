
import { Persona } from './Persona';
import { Usuario } from './Usuario';
import { AreaServicio } from './AreaServicio';
export class Empleado extends Usuario{

  public inicioCargo?:Date;
  public finCargo?:Date;
  public areaServicio:AreaServicio[];
  public areaServicioKey:number[];


  constructor(){
    super();
    this.persona=new Persona();
  }

}

