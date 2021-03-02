import { Funcionalidades } from "./Funcionalidades";
import { BaseModel } from './Base/Base.Model';
import { EstadoGenerico } from './Enums/EstadoGenerico';

export class Rol extends BaseModel{
  public nombre:string;
  public estado:EstadoGenerico;
  public funcionalidades:Funcionalidades;
}
