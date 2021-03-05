import { Component, Input, OnInit, ViewChild, TemplateRef, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { API, APIDefinition, Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ServicieGeneric } from 'src/app/Service/service.index';
import { SalaService } from '../../Service/Sala/sala.service';
import { DataListado } from './Interface/ListadoTablaInterface';

interface EventObject {
  event: string;
  value: {
    limit: number;
    page: number;
    key: string;
    order: string;
  };
}

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {

  @ViewChild('table', { static: true }) table: APIDefinition;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  selected;
  @Input() Columns = [];
  @Input() rutaApi:string;
  @Input() pagination={
    limit: 10,
    offset: 0,
    count: -1,
    sort: '',
    order: '',
  };


  public data;

  public configuration: Config;
    constructor( private readonly companyService: SalaService,
    private readonly cdr: ChangeDetectorRef,
    private _ServiceGeneric: ServicieGeneric) {
   }


  ngOnInit(): void {
    this.data=[];
    this.configuration = { ...DefaultConfig };
    this.configuration.tableLayout.striped = !this.configuration.tableLayout.striped;
    this.configuration.tableLayout.style = 'tiny';
    this.configuration.resizeColumn = true;
    this.configuration.fixedColumnWidth = false;
    this.configuration.persistState = true;
    this.configuration.serverPagination = true;
    this.configuration.threeWaySort = true;
    this.getData('');


  }
  onEvent(event: { event: string; value: any }): void {
    this.selected = JSON.stringify(event.value.row, null, 2);
  }

  eventEmitted(event: { event: string; value: any }): void {
    if (event.event === 'onOrder') {
      console.log(event.event);

      this.parseEvent(event);
    }
  }

  private parseEvent(obj: any): void {

    this.pagination.limit = obj.value.limit ? obj.value.limit : this.pagination.limit;
    this.pagination.offset = obj.value.page ? obj.value.page : this.pagination.offset;
    this.pagination.sort = !!obj.value.key ? obj.value.key : this.pagination.sort;
    this.pagination.order = !!obj.value.order ? obj.value.order : this.pagination.order;
    this.pagination = { ...this.pagination };
    const pagination:any={
      size:this.pagination.limit,
      page: (this.pagination.offset===0)?1:this.pagination.offset,
      orderBy:this.pagination.sort,
      order:this.pagination.order
    }


    this.getData(pagination);
  }

  public getData(paginacion:any): void {
    this.configuration.isLoading = true;
    this._ServiceGeneric.getRemove<DataListado<any>>(null,`${this.rutaApi}`,paginacion)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(res=>{
        this.data=res.data;
        console.log(this.data);
        this.configuration.isLoading = false;
          this.pagination.count=res.totalEntities;
          this.pagination = { ...this.pagination };
    })

  }

  onChange(name: string): void {

    this.table.apiEvent({
      type: API.onGlobalSearch,
      value: name,
    });
  }



}
