import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Columns } from 'ngx-easy-table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SalaService } from '../Service/Sala/sala.service';
import { ServicieGeneric } from '../Service/service.index';
import { DataListado } from '../components/tabla/Interface/ListadoTablaInterface';
import { Edificio } from '../models/Edificio.Model';
declare function INIT_PLUGIN();
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  public columns: Columns[] = [
    { key: 'nombre', title: 'NOMBRE' },
    { key: 'direccion', title: 'DIRECCION' },
    { key: 'key', title: 'KEY' },
  ];

  public pagination = {
    limit: 10,
    offset: 0,
    count: -1,
  };
  public data:DataListado<Edificio> ;

  constructor(  private readonly companyService: SalaService,
    private readonly cdr: ChangeDetectorRef,
    private _ServiceGeneric: ServicieGeneric) { }
    private ngUnsubscribe: Subject<void> = new Subject<void>();

  ngOnInit() {
    INIT_PLUGIN();
    this.getData();
  }

  public verNuevoDato(event:any){
    console.log(event);

  }


  //pagina 1, numero 10 filas
  public getData(params: string='/1/10'): void {

    this._ServiceGeneric.getRemove<DataListado<Edificio>>(null,`edificio${params}`)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(res=>{
        this.data=res;
        console.log(res.data);
          this.pagination.count=res.totalEntities;
          this.pagination = { ...this.pagination };
    })


  }


}
