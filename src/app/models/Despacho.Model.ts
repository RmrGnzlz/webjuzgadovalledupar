import { BaseModel } from './Base/Base.Model';
import { Edificio } from './Edificio.Model';
import { EstadoGenerico } from './Enums/EstadoGenerico';

export class Despacho extends BaseModel
{
    public edificio: Edificio;
    public edificioKey: number;
    public nombre: string;
    public telefono: string;
    public estado: EstadoGenerico;

    constructor(nombre: string, telefono: string, estado: EstadoGenerico, edificioKey: number){
      super();
      this.nombre = nombre;
      this.telefono = telefono;
      this.estado = estado;
      this.edificioKey = edificioKey;
    }

}


