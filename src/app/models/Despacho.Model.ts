import { BaseModel } from './Base/Base.Model';
import { Edificio } from './Edificio.Model';

export class Despacho extends BaseModel
{
    public edificio: Edificio;
    public edificioKey: number;
    public nombre: string;
    public telefono: string;
}