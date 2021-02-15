import { EstadoEmpleado } from './Enpleado';
import { BaseModel } from './Base/Base.Model';
import { Rol } from './Rol';
import { Funcionalidades } from './Funcionalidades';
import { Persona } from './Persona';
export class Usuario extends BaseModel {
  public username: string;
  public password: string;
  public rememberPassword: string;
  public rol: Rol;
  public rolKey: number;
  public UsuarioEstado: EstadoEmpleado;
  public funcionalidades: Funcionalidades[] = [];
  public persona: Persona;
  public personaKey: number;

}
