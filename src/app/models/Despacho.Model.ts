import { BaseModel } from './Base/Base.Model';
import { Edificio } from './Edificio.Model';

export class Despacho extends BaseModel
{
    public edificio: Edificio;
    public nombre: string;
    public telefono: string;
    public estado: EstadoDespacho;
}

export enum EstadoDespacho{
  Inactivo = 0,
  Activo = 1
}
