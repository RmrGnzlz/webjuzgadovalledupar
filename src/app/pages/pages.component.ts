import { Component, OnInit } from '@angular/core';
declare function INIT_PLUGIN();
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    INIT_PLUGIN();
  }

}
