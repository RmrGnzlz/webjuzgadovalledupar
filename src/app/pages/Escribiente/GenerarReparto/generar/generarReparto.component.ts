import { Component, OnInit } from '@angular/core';
import { ServicieGeneric } from 'src/app/Service/ServiceGeneric';
import { NotificacionServiceService } from 'src/app/utils/notificacion-service.service';

@Component({
  selector: 'app-generarReparto',
  templateUrl: './generar.component.html',
  styleUrls: ['./generar.component.css']
})
export class GenerarRepartoComponent implements OnInit {
  pdfSrc = "";
  audiencias:any;
  constructor(private notificacion: NotificacionServiceService,
    private _ServiceGeneric: ServicieGeneric) { }

  ngOnInit(): void {
    this.audiencias=[
      {key:1,nombre:'aseguramiento'},
      {key:2,nombre:'acusacion'},
      {key:3,nombre:'cadena perpetua'},
      {key:4,nombre:'cadena de muerte'}
    ]
  }

  verAnexo(){

  }

  onFileSelected() {
    let $img: any = document.querySelector('#file');

    if (typeof (FileReader) !== 'undefined') {
      let reader = new FileReader();

      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
      };
      reader.readAsArrayBuffer($img.files[0]);
    }
  }

  isPDF(evento) {

    let archivo: File = evento.target.files[0];
    if (!archivo) return;

    if (archivo.type.indexOf('pdf') < 0) {

      // this.solicitudForm.controls['archivo'].setErrors({ 'incorrect': true });
      evento.srcElement.value = null;
      this.notificacion.MensajeInfo("Solo se aceptan PDF", "Error");
      this.pdfSrc='';
      return;
    }
    this.onFileSelected();
    // this.solicitudAudiencia.archivo = archivo;
    return;
  }

}
