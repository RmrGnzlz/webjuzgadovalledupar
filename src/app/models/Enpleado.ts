import { RolEnums } from './Enums/RolEnums';
import { BaseModel } from './Base/Base.Model';
import { Persona } from './Persona';
export class Empleado extends BaseModel{

  public estado: EstadoEmpleado;
  public usuario:string;
  public password:string;
  public remmemberPassword:string;
  public persona:Persona;
  public rol:RolEnums;
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
