import { BaseModel } from './Base/Base.Model';

export class Persona extends BaseModel{

  public numeroDocumento:string;
  public tipoDocumento: string;
  public nombre: string;
  public direccion: string;
  public expedicionDocumento: string;
  public telefono: string;
  public email: string;
  public nacionalidadKey:number;
  public nacionalidad: any;
  public empleado: any[];

}


