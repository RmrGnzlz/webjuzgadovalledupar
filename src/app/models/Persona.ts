import { BaseModel } from './Base/Base.Model';
import { Pais } from './Pais';

export class Persona extends BaseModel{

  public numeroDocumento:string;
  public tipoDocumento: string;
  public nombres: string;
  public apellidos:string;
  public direccion: string;
  public expedicionDocumento: Date;
  public telefono: string;
  public email: string;
  public pais:Pais;
  public paisKey:number;
  public nacionalidad: Pais;
  // public empleado: any[];
  constructor(){super();
  this.nacionalidad= new Pais();
  }

}


