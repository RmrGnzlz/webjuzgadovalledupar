import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicieGeneric } from 'src/app/Service/ServiceGeneric';
import { NotificacionServiceService } from 'src/app/utils/notificacion-service.service';
import { Juzgado, TipoAreaEnum } from '../../../../models/Juzgado.Model';
import { ResponseHttp } from '../../../../models/Base/ResponseHttp';
import { Empleado } from '../../../../models/Empleado';

@Component({
  selector: 'app-cardjuzgado',
  templateUrl: './cardjuzgado.component.html',
  styleUrls: ['./cardjuzgado.component.css']
})
export class CardjuzgadoComponent implements OnInit {

  @Input() juzgado:Juzgado;

  listadoJueces:Empleado[]=[];
  agregar:boolean=false;
  form: FormGroup;
  EnumAreaServici:TipoAreaEnum;

  constructor(private formBuilder: FormBuilder,
    private readonly notificacion:NotificacionServiceService,
    private _serviceGeneric:ServicieGeneric) { }

  ngOnInit(): void {
  this.buildForm();
  }
  buildForm() {
    this.form = this.formBuilder.group({
      juezKey: ['',[Validators.required]],
      juzgadoKey: [''],
      principal: [false],
    });
  }

  showAgregar(){
    this.agregar=true;
    this._serviceGeneric.getRemove<ResponseHttp<Empleado>>(null,'juez')
    .subscribe(res=>{
      this.listadoJueces=res.data as Empleado[];
        console.log(this.listadoJueces);

    });
  }

  puedeAsignarJuez=()=>this.juzgado?.tipo as TipoAreaEnum != TipoAreaEnum.Magistrado &&this.juzgado?.jueces.length==0;


  eliminarJuezDeJuzgado(juez:any,juzgadokey:number){
  var request:any={
    juezKey:juez.key,
    juzgadokey:juzgadokey
    }
    var res=this.notificacion.MensajeConfir('Seguro desea eliminar juez '+juez.nombre,"Información");
    res.then(res=>{
      this._serviceGeneric.postPatch<ResponseHttp<Juzgado>>('juzgado',request)
      .subscribe(res=>this.notificacion.MensajeSuccess(res.message))
    })
  }

  cambiarJuezPrincipal(keyJuez:number,keyJuzgado:number){
    var res=this.notificacion.MensajeConfir("Esta seguro, de cambiar el juez principal","Información");
    res.then(res=>{
      this._serviceGeneric.postPatch<ResponseHttp<Juzgado>>('juzgado',{keyJuez,keyJuzgado})
      .subscribe(res=>{
        this.notificacion.MensajeSuccess(res.message);
      })
    })
  }

  agregarJuez(){
  if(this.form.invalid){
    this.notificacion.MensajeError('Formulario Invalido');
    this.form.markAllAsTouched();
    return;
  }
    this.juzgad.setValue(this.juzgado.key);
    this._serviceGeneric.postPatch<ResponseHttp<Juzgado>>('juzgado',this.form.value)
    .subscribe(res=>{
      this.juzgado=res.data as Juzgado;
      this.notificacion.MensajeSuccess(res.message);
    });

  }


  get juez() { return this.form.get('juezKey'); }
  get juzgad() { return this.form.get('juzgadoKey'); }
  get principal() { return this.form.get('principal'); }

}
