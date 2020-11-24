import { BaseModel } from './Base/Base.Model';
import { Edificio } from 'src/app/models/Edificio.Model';

export  class Sala extends BaseModel  {
public nombre: string;
public estado: EstadoSalaEnum;
public edificio: Edificio;
public TipoSala: TipoSalaEnum;
}

export class SalaFisica extends Sala{
public numero: string;
public piso: string;
}

export class SalaVirtual extends Sala{
public plataforma: PlataformaEnum;
public link: string;
}

export enum EstadoSalaEnum{
  Inhabilitada= 0,
  Habilitada= 1
}
export enum TipoSalaEnum{
  Fisica= 1,
  Virtual= 0
}

export enum PlataformaEnum{
  MicrosoftTeams =  0,
  GoogleMeet = 1,
  Zoom = 2,
  Cisco = 3,
  Slack = 4,
  Skype = 5,
  Hangouts = 6

}


