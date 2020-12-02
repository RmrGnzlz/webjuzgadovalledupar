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

}

export enum TipoAreaEnum {
  Garantia = 0,
  Conocimiento = 1,
  Magistrado = 2
}
