import { BaseModel } from './Base/Base.Model';

export class Edificio extends BaseModel
{
    public nombre: string;
    public direccion: string;
    public latitud: number;
    public longitud: number;
}