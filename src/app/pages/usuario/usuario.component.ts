import { Company } from './../../../assets/data';
import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { API, APIDefinition, Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { data } from '../../../assets/data';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsuarioComponent implements OnInit {
  @ViewChild('phoneTpl', { static: true }) phoneTpl: TemplateRef<any>;
  @ViewChild('isActiveTpl', { static: true }) isActiveTpl: TemplateRef<any>;
  public columns: Columns[];
  data: Company[] = [];
  public configuration: Config;
  ngOnInit(): void {
    this.columns = [
      { key: 'phone', title: 'Phone', cellTemplate: this.phoneTpl },
      { key: 'age', title: 'Age' },
      { key: 'company', title: 'Company' },
      { key: 'name', title: 'Name' },
      { key: 'isActive', title: 'STATUS',cellTemplate:this.isActiveTpl },
    ];
    this.configuration = { ...DefaultConfig };
    this.data = data;
  }
}
