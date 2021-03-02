import { BaseModel } from './Base/Base.Model';
import { Edificio } from 'src/app/models/Edificio.Model';
import { EstadoGenerico } from './Enums/EstadoGenerico';

export  class Sala extends BaseModel  {
public nombre: string;
public estado: EstadoGenerico;
public edificio: Edificio;
public edificioKey: number;
public TipoSala: TipoSalaEnum;

constructor(nombre: string, estado: EstadoGenerico, edificioKey: number){
  super();
  this.nombre = nombre;
  this.estado = estado;
  this.edificioKey = edificioKey;
}
}

// probando azure devops commit

export class SalaFisica extends Sala{
public numero: string;
public piso: string;
constructor(nombre: string, estado: EstadoGenerico, edificioKey: number, numero: string, piso: string){
  super(nombre, estado, edificioKey);
  this.numero = numero;
  this.piso = piso;
}


}

export class SalaVirtual extends Sala{
public plataforma: string;
public link: string;

constructor(nombre: string, estado: EstadoGenerico, edificioKey: number, link: string, plataforma: string){
  super(nombre, estado, edificioKey);
  this.plataforma = link;
  this.link = plataforma;
}

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


