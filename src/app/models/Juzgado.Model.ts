import { BaseModel } from './Base/Base.Model';
import { Despacho } from './Despacho.Model';
import { Audiencia } from './Audiencia';
export class Juzgado extends BaseModel {
  public nombre: string;
  public email: string;
  public despacho: Despacho;
  public despachoKey: number;
  public tipo: TipoAreaEnum;
  public audiencias: Audiencia[];
  public estado :EstadoJuzgado;

   constructor(nombre:string, email:string, despacho:number,tipo: TipoAreaEnum, estado: EstadoJuzgado ){
     super();
      this.nombre=nombre;
      this.email=email;
      this.despachoKey=despacho;
      this.tipo=tipo;
      this.estado=estado;

   }


}

export enum TipoAreaEnum {
  Garantia = 0,
  Conocimiento = 1,
  Magistrado = 2
}

export enum EstadoJuzgado{
  Inactivo=0,
  Activo=1
}
