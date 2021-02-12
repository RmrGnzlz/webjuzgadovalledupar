import { RolEnums } from './Enums/RolEnums';
import { BaseModel } from './Base/Base.Model';
import { Persona } from './Persona';
import { Rol } from './Rol';
export class Empleado extends BaseModel{

  public estado: EstadoEmpleado;
  public usuario:string;
  public password:string;
  public remmemberPassword:string;
  public persona:Persona;
  public personaKey:number;
  public rolKey:number;
  public rol:Rol;
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
