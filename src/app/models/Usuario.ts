import { BaseModel } from './Base/Base.Model';
import { Rol } from './Rol';
import { Funcionalidades } from './Funcionalidades';
import { Persona } from './Persona';
import { EstadoGenerico } from './Enums/EstadoGenerico';
export class Usuario extends BaseModel {
  public username: string;
  public password: string;
  public rememberPassword: string;
  public rol: Rol;
  public rolKey: number;
  public estado: EstadoGenerico;
  public funcionalidades: Funcionalidades[] = [];
  public persona: Persona;
  public personaKey: number;

  constructor(){
    super();
    this.rol= new Rol();
  }
}
