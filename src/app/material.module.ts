import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// ANGULAR-MATERIAL COMPONENTES
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule,MatTableDataSource} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule, MatGridListModule, MatIconModule, MatInputModule, MatPaginatorModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule
  ]
})
export class MaterialModule { }
