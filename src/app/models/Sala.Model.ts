import { BaseModel } from './Base/Base.Model';
import { Edificio } from 'src/app/models/Edificio.Model';

export interface SalaResponse extends BaseModel  {
nombre: string;
estado: string;
edificio: Edificio;
}

export interface SalaRequest extends BaseModel  {
  nombre: string;
  edificioKey: number;
  }
