import { PagesRoutingModule } from './pages-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from '../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';

import { NgxSelectModule } from 'ngx-select-ex';
import { NgxPermissionsModule } from 'ngx-permissions';


const ngWizardConfig: NgWizardConfig = {
  theme: THEME.circles
};


@NgModule({
  declarations: [

  ],
  imports: [
    // CommonModule,
    ComponentsModule,
    PagesRoutingModule,
    NgWizardModule.forRoot(ngWizardConfig),
    NgxSelectModule,
    NgxPermissionsModule.forChild()
  ],
  exports:[]
})
export class PagesModule { }
