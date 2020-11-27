import { Company } from './../../../assets/data';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { API, APIDefinition, Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { data } from '../../../assets/data';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsuarioComponent implements OnInit {
  modal = false;
  selected;
  @ViewChild('table', { static: true }) table: APIDefinition;
  public columns: Columns[] = [
    { key: 'age', title: 'Age' },
    { key: 'company', title: 'Company' },
    { key: 'name', title: 'Name' },
    { key: 'isActive', title: 'STATUS' },
    { key: 'isActive', title: 'Edit' },
  ];
  data: Company[] = [];
  public configuration: Config;

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.configuration.tableLayout.striped = !this.configuration.tableLayout.striped;
    this.configuration.tableLayout.style = 'tiny';

    this.data = data;
  }

  onEvent(event: { event: string; value: any }): void {
    this.selected = JSON.stringify(event.value.row, null, 2);
  }

  showModal(row:any): void {
    console.log('abrir modal');
    console.log(row);

    this.modal = true;
  }

  hideModal(): void {
    this.modal = false;
  }
  onChange(name: string): void {
    this.table.apiEvent({
      type: API.onGlobalSearch,
      value: name,
    });
  }

}
