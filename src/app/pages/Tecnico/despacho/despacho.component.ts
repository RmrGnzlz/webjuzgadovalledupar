import { Component, OnInit } from '@angular/core';
import {SnotifyPosition, SnotifyService} from 'ng-snotify';

@Component({
  selector: 'app-despacho',
  templateUrl: './despacho.component.html',
})
export class DespachoComponent implements OnInit {
  style = 'material';
  // private toastr: ToastrService,
  constructor(private service: SnotifyService) { }

  ngOnInit(): void {
  }

  notificar(){
    this.service.confirm('Example body content', 'Example title', {
      timeout: 5000,
      position:SnotifyPosition.rightTop,
      showProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      buttons: [
        {text: 'Yes', action: () => console.log('Clicked: Yes'), bold: false},
        {text: 'No', action: () => console.log('Clicked: No')},
        {text: 'Later', action: (toast) => {console.log('Clicked: Later'); this.service.remove(toast.id); } },
        {text: 'Close', action: (toast) => {console.log('Clicked: No'); this.service.remove(toast.id); }, bold: true},
      ]
    });
  }

}
