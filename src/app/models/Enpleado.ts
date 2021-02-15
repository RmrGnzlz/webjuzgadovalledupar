import { RolEnums } from './Enums/RolEnums';
import { BaseModel } from './Base/Base.Model';
import { Persona } from './Persona';
import { Rol } from './Rol';
import { Usuario } from './Usuario';
export class Empleado extends Usuario{

  public inicioCargo?:Date;
  public finCargo?:Date;

  constructor(){
    super()
    this.persona=new Persona();
  }

}

export enum EstadoEmpleado{
  Inactivo = 0,
  Activo = 1,
  Eliminado = 2
}
