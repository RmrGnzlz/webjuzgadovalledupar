import { BaseModel } from './Base/Base.Model';
import { Audiencia } from './Audiencia';
import { EstadoGenerico } from './Enums/EstadoGenerico';
import { Edificio } from './Edificio.Model';
import { AreaServicio } from './AreaServicio';
import { Empleado } from './Empleado';
export class Juzgado extends BaseModel {
  public nombre: string;
  public email: string;
  public tipo: AreaServicio | TipoAreaEnum
  public audiencias: Audiencia[];
  public jueces:Empleado[]=[];
  public estado: EstadoGenerico;
  public edificio: Edificio;
  public edificioKey: number;
  public telefono: string;


  constructor(){
    super();
  }
  // constructor(nombre: string, email: string, tipo: TipoAreaEnum, estado: EstadoGenerico) {
  //   super();
  //   this.nombre = nombre;
  //   this.email = email;
  //   this.tipo = tipo;
  //   this.estado = estado;

  // }


}

export enum TipoAreaEnum {
  Garantia = 0,
  Conocimiento = 1,
  Magistrado = 2
}

