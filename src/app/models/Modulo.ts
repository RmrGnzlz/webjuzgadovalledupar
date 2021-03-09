import { BaseModel } from './Base/Base.Model';
import { Funcionalidades } from './Funcionalidades';
export class Modulo extends BaseModel{
  public nombre: string;
  public funcionalidades:Funcionalidades[]=[];

}
