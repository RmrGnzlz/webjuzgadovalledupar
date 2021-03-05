import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Columns } from 'ngx-easy-table';
import { Empleado } from 'src/app/models/Enpleado';
import { RolEnums } from 'src/app/models/Enums/RolEnums';
import { ServicieGeneric } from 'src/app/Service/service.index';
import { NotificacionServiceService } from 'src/app/utils/notificacion-service.service';
import { Persona } from '../../../../models/Persona';
import { ResponseHttp } from '../../../../models/Base/ResponseHttp';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { EstadoGenerico } from '../../../../models/Enums/EstadoGenerico';
import { TablaComponent } from 'src/app/components/tabla/tabla.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-listado-empleado',
  templateUrl: './listado-empleado.component.html'
})
export class ListadoEmpleadoComponent implements OnInit {
  @ViewChild(TablaComponent) tabla: TablaComponent;
  @ViewChild('actionTpl', { static: true }) actionTpl: TemplateRef<any>;
  @ViewChild('estadoTpl', { static: true }) estadoTpl: TemplateRef<any>;
  @ViewChild('personaTpl', { static: true }) personaTpl: TemplateRef<any>;
  @ViewChild('rolTpl', { static: true }) rolTpl: TemplateRef<any>;
  @ViewChild('botonCerrar', { static: false }) botonCerrar: ElementRef;
  formEdit: FormGroup;

  modal = false;
  selected;

  public Columns: Columns[];
  public listaEmpleado:Empleado[]=[];
  public empleado= new Empleado;
  constructor(private notificacion: NotificacionServiceService,
              private _ServiceGeneric: ServicieGeneric,
              private formBuilder: FormBuilder,

              ) { }

  ngOnInit(): void {

    this.Columns = [
      { key: 'key', title: '#',width:"3%"},
      { key: 'persona', title: 'Nombre',width:"20%",cellTemplate:this.personaTpl },
      { key: 'persona.telefono', title: 'Telefono',width:"10%" },
      { key: 'rol.nombre', title: 'Rol', cellTemplate:this.rolTpl,width:"15%"},
      { key: 'username', title: 'Usuario',width:"20%" },
      { key: 'estado', title: 'Estado', cellTemplate:this.estadoTpl,width:"10%"},
      { key: 'opciones', title: 'Opciones',cellTemplate: this.actionTpl,width:"10%"},
    ];

    this.buildForm();
    this.loadEmpleados();

  }

  buildForm() {
    this.formEdit = this.formBuilder.group({
      direccion:['', [Validators.required]],
      telefono: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      fechaFinalizacion: ['',[Validators.required]],
      email: ['', [Validators.required]]
    });
  }

  loadEmpleados(){
    this._ServiceGeneric.getDeleteObject<ResponseHttp<Empleado>>('empleado/All',{currentPage:0,pageSize:0})
    .subscribe(res=>{this.listaEmpleado=res.data as Empleado[];

    });
  }

  showEmpleado(empleado:Empleado){
  this.empleado=empleado
  console.log(this.empleado.finCargo);
  this.telefono.setValue(empleado.persona.telefono);
  this.direccion.setValue(empleado.persona.direccion);
  this.email.setValue(empleado.persona.email);
  this.fechaFinalizacion.setValue(new Date(empleado.finCargo).toISOString().substring(0,10));

  }

  async delete(empleado:Empleado,rowIndex:number){
    var res=await this.notificacion.MensajeConfir(empleado.persona.nombres);
    if (res) {
      this._ServiceGeneric.getRemove<ResponseHttp<Empleado>>(empleado.key,`usuario`,null,'delete')
      .subscribe(res=>{
        this.tabla.data=[...this.tabla.data.filter((_v, k) => k !== rowIndex)];
        this.notificacion.MensajeSuccess(res.message);
      });
    }

  }

  UpdatePersonaYEmpleado(){

        if (this.formEdit.invalid) {
          this.formEdit.markAllAsTouched();
            this.notificacion.MensajeInfo("formulario invalido");
          return;
        }

    var requestPersonaUpdate:any={
      key:this.empleado.persona.key,
      nombres:this.empleado.persona.nombres,
      apellidos:this.empleado.persona.apellidos,
      tipoDocumento:this.empleado.persona.tipoDocumento,
      numeroDocumento:this.empleado.persona.numeroDocumento,
      expedicionDocumento:this.empleado.persona.expedicionDocumento,
      direccion:this.direccion.value,
      telefono:this.telefono.value,
      email:this.email.value,
      documento:this.empleado.persona.numeroDocumento,
      nacionalidadKey:this.empleado.persona.nacionalidad.key
      }
    var requestEmpleadoUpdate:any={
      key:this.empleado.key,
      finCargo: this.fechaFinalizacion.value
    }

    let ObservablePutPersona=this._ServiceGeneric.postPatch<ResponseHttp<Persona>>(`persona`,requestPersonaUpdate,null,'put');
    let ObservablePutEmpleado=this._ServiceGeneric.postPatch<ResponseHttp<Empleado>>(`empleado`,requestEmpleadoUpdate,null,'put');
    forkJoin([ObservablePutEmpleado,ObservablePutPersona])
    .subscribe(res=>{
      this.botonCerrar.nativeElement.click();
      this.notificacion.MensajeSuccess('Registro actualizado');
      this.tabla.getData('');
    })


  }

  updateState(key:number,status:boolean){
      var estado=status?1:0;
  this._ServiceGeneric.postPatch(`usuario/estado`,{key,estado},null,'put')
  .subscribe(res=>{
    this.notificacion.MensajeSuccess("Estado Actualizado");
    // this.loadEmpleados();
  })

  }

  RolEmpleado(valor:any):string{
    return RolEnums[valor];
  }

  stateEmpleado(valor:any):string{

    return EstadoGenerico[valor]
  }
  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  get telefono() { return this.formEdit.get('telefono'); }
  get email() { return this.formEdit.get('email'); }
  get direccion() { return this.formEdit.get('direccion'); }
  get fechaFinalizacion() { return this.formEdit.get('fechaFinalizacion'); }


}
