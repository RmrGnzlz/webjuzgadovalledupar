import { Component, Input, OnInit, ViewChild, TemplateRef, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { API, APIDefinition, Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ServicieGeneric } from 'src/app/Service/service.index';
import { SalaService } from '../../Service/Sala/sala.service';
import { DataListado } from './Interface/ListadoTablaInterface';



@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {

  selected;
  @Input() Data:DataListado<any> = {};
  @Input() Columns = [];
  @Input() pagination={limit: 10,offset: 0,count: -1,};
  @ViewChild('table', { static: true }) table: APIDefinition;
  @Output() nuevoDatos: EventEmitter<string> = new EventEmitter();

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public configuration: Config;
    constructor( private readonly companyService: SalaService,
    private readonly cdr: ChangeDetectorRef,
    private _ServiceGeneric: ServicieGeneric) {
   }


  ngOnInit(): void {

    this.configuration = { ...DefaultConfig };
    this.configuration.tableLayout.striped = !this.configuration.tableLayout.striped;
    this.configuration.tableLayout.style = 'tiny';

    // this.getData('');
  }
  onEvent(event: { event: string; value: any }): void {
    this.selected = JSON.stringify(event.value.row, null, 2);
  }

  eventEmitted($event: { event: string; value: any }): void {
    console.log($event.event);

    if ($event.event !== 'onClick') {
      console.log($event.event);

      this.parseEvent($event);
    }
  }

  private parseEvent(obj: any): void {

    this.pagination.limit = obj.value.limit ? obj.value.limit : this.pagination.limit;
    this.pagination.offset = obj.value.page ? obj.value.page : this.pagination.offset;
    this.pagination = { ...this.pagination };
    const params =`/${this.pagination.offset}/${this.pagination.limit}`;
      this.nuevoDatos.emit(params);
  }


  onChange(name: string): void {
    this.table.apiEvent({
      type: API.onGlobalSearch,
      value: name,
    });
  }



}
