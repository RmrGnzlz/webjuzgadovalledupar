import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaComponent } from './tabla/tabla.component';
import { TableModule } from 'ngx-easy-table';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgWizardConfig, NgWizardModule, THEME } from 'ng-wizard';
import { NgxMaskModule } from 'ngx-mask';

const ngWizardConfig: NgWizardConfig = {
  theme: THEME.circles
};

@NgModule({
  declarations: [
    TablaComponent,
  ],
  imports: [
    TableModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgWizardModule.forRoot(ngWizardConfig),
    NgxMaskModule.forRoot(),

  ],
  exports: [
    TablaComponent,
    TableModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgWizardModule,
    NgxMaskModule
  ]
})
export class ComponentsModule { }
