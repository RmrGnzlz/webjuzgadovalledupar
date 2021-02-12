import { Funcionalidades } from "./Funcionalidades";
import { BaseModel } from './Base/Base.Model';

export class Rol extends BaseModel{
  public nombre:string;
  public estado:string;
  public funcionalidades:Funcionalidades;
}
