import { EstadoGenerico } from './../models/Enums/EstadoGenerico';
import { Pipe, PipeTransform } from '@angular/core';
import { TipoAreaServicio } from '../models/Enums/TipoAreaServicio';

@Pipe({
  name: 'stringEnum'
})
export class StringEnumPipe implements PipeTransform {

  transform(value:number, enums:string) : string {
        console.log(value);

    switch (enums) {
      case 'EnumGenerico': return EstadoGenerico[value];
      case 'TipoAreaServicio':return TipoAreaServicio[value];

      default:
        return '';

    }

  }

}
