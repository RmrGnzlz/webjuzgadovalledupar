import { BaseModel } from './Base/Base.Model';

export class Persona extends BaseModel{

  public NumeroDocumento:string;
  public TipoDocumento: string;
  public Nombre: string;
  public Dirrecion: string;
  public ExpedicionDocumento: string;
  public Telefono: string;
  public Email: string;
  public NacionalidadKey:number;
  public Nacionalidad: any;
  public Empleado: any[];

}


