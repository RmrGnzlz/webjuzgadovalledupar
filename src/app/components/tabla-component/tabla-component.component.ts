import { AfterViewInit, Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

export interface IHeaderTemplate {
  text: string;
  value: string;
  templateRef: TemplateRef<any>;
}
export interface IInformationTemplate {
  title: string;
  subTitle: string;
}


@Component({
  selector: 'app-tabla-component',
  templateUrl: './tabla-component.component.html',
  styleUrls: ['./tabla-component.component.css']
})
export class TablaComponentComponent implements OnInit, AfterViewInit {
  @ContentChild('rows') templateRef: TemplateRef<any>;
  @ViewChild('table') private tableView;
  headers: IHeaderTemplate[];
  @Input() set headersInput(value) {
    if (value) {

      this.headers = value;
      this.headerValues = this.headers.map((header: IHeaderTemplate) => header.value);
    }
  }
  @Input() information: IInformationTemplate;
  private _data: any;
  @Input() set data(value) {
    if (value) {
      this._data = value;
      this.dataSource = new MatTableDataSource(this._data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
  @Output() table = new EventEmitter<MatTable<any>>();
  @Input() filter: boolean;
  headerValues: string[] = [];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor() {
  }

  ngAfterViewInit(): void {
    this.table.emit(this.tableView);
  }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
