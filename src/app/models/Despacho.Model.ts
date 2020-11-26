import { BaseModel } from './Base/Base.Model';
import { Edificio } from './Edificio.Model';

export class Despacho extends BaseModel
{
    public edificio: Edificio;
    public edificioKey: number;
    public nombre: string;
    public telefono: string;
    public estado: EstadoDespacho;

    constructor(nombre: string, telefono: string, estado: EstadoDespacho, edificioKey: number){
      super();
      this.nombre = nombre;
      this.telefono = telefono;
      this.estado = estado;
      this.edificioKey = edificioKey;
    }

}

export enum EstadoDespacho{
  Inactivo = 0,
  Activo = 1
}
