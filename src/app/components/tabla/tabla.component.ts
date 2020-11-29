import { Component, Input, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { API, APIDefinition, Columns, Config, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {

  selected;
  @Input() Data;
  @Input() Columns = [];
  @ViewChild('table', { static: true }) table: APIDefinition;

  public configuration: Config;
  constructor() { }

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.configuration.tableLayout.striped = !this.configuration.tableLayout.striped;
    this.configuration.tableLayout.style = 'tiny';
  }
  onEvent(event: { event: string; value: any }): void {
    this.selected = JSON.stringify(event.value.row, null, 2);
  }

  onChange(name: string): void {
    this.table.apiEvent({
      type: API.onGlobalSearch,
      value: name,
    });
  }



}
