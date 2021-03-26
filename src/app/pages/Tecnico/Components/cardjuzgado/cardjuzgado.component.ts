import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicieGeneric } from 'src/app/Service/ServiceGeneric';
import { NotificacionServiceService } from 'src/app/utils/notificacion-service.service';
import { Juzgado, TipoAreaEnum } from '../../../../models/Juzgado.Model';
import { ResponseHttp } from '../../../../models/Base/ResponseHttp';
import { Empleado } from '../../../../models/Empleado';
import { filter, map } from 'rxjs/operators';

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
    console.log(this.juzgado);
  this.buildForm();
  if(!this.puedeAsignarPrincipal)this.principal.setValue(true);
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
    console.log(this.juzgado);

    return this._serviceGeneric.getRemove<ResponseHttp<any>>(null,'juez')
    .pipe(
      map(res=>{return res.data})
    )
    .subscribe(res=>{
      console.log(res);
      // console.log(res[0].area);
      this.listadoJueces=res.filter(dato=>dato.area===this.juzgado.tipo);

    });
  }

  puedeAsignarJuez=()=>(this.juzgado?.tipo as unknown as string === 'Magistrado'?true : this.juzgado?.jueces.length==0);
  puedeAsignarPrincipal=()=>this.juzgado?.tipo as unknown as string === 'Magistrado';
  isConocimientoOgarantia=()=> this.juzgado?.tipo as TipoAreaEnum != TipoAreaEnum.Conocimiento;

  revocarJuez(juez:Empleado){

    console.log(juez);

  var request:any={
    juezKey:juez.key,
    juzgadokey:this.juzgado.key
    }
    var res=this.notificacion.MensajeConfir('Seguro desea quitar el juez '+juez.persona.nombres,"Información");
    res.then(res=>{
      this._serviceGeneric.postPatch<ResponseHttp<Juzgado>>('juzgado/revocar',request)
      .subscribe(res=>this.notificacion.MensajeSuccess(res.message))
    })
  }

  cambiarJuezPrincipal(juez:Empleado){
    var request:any={
      juezKey:juez.key,
      juzgadokey:this.juzgado.key
      }
    var res=this.notificacion.MensajeConfir("Esta seguro, de cambiar el juez principal","Información");
    res.then(res=>{
      this._serviceGeneric.postPatch<ResponseHttp<Juzgado>>('juzgado',request)
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

  console.log(this.form.value);

    // this.juzgad.setValue(this.juzgado.key);
    // this._serviceGeneric.postPatch<ResponseHttp<Juzgado>>('juzgado/AsignarJuez',this.form.value)
    // .subscribe(res=>{
    //   this.juzgado=res.data as Juzgado;
    //   this.notificacion.MensajeSuccess(res.message);
    // });

  }


  get juez() { return this.form.get('juezKey'); }
  get juzgad() { return this.form.get('juzgadoKey'); }
  get principal() { return this.form.get('principal'); }

}
