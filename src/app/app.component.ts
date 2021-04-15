import { Component, OnInit } from '@angular/core';

//HELPERS
import { Validators } from '@angular/forms';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { ValidatorHelper } from './utils/validator-helper';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// tslint:disable-next-line: align
export class AppComponent implements OnInit{
  title = 'WebJuzgadoValledupar';
constructor(){

}

ngOnInit(): void {
  Validators.minLength = ValidatorHelper.minLength;

}

}
