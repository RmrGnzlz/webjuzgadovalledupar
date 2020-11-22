import { BaseModel } from './Base/Base.Model';
import { Edificio } from 'src/app/models/Edificio.Model';

export class Sala extends BaseModel  {
public nombre: string;
public estado: EstadoSala;
public edificio: Edificio;
}

export enum EstadoSala{
  Inhabilitada= 0,
  Habilitada= 1,
  Eliminada = 2
}


