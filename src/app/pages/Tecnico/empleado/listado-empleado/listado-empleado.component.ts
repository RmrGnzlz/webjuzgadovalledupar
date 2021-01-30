import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Columns } from 'ngx-easy-table';
import { Empleado, EstadoEmpleado } from 'src/app/models/Enpleado';
import { RolEnums } from 'src/app/models/Enums/RolEnums';
import { ServicieGeneric } from 'src/app/Service/service.index';
import { NotificacionServiceService } from 'src/app/utils/notificacion-service.service';
import { Persona } from '../../../../models/Persona';
import { ResponseHttp } from '../../../../models/Base/ResponseHttp';
import { TipoDocumentos } from 'src/app/models/Enums/DocumentosValidosEnum';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-listado-empleado',
  templateUrl: './listado-empleado.component.html',
  styleUrls: ['./listado-empleado.component.css']
})
export class ListadoEmpleadoComponent implements OnInit {

  @ViewChild('actionTpl', { static: true }) actionTpl: TemplateRef<any>;
  @ViewChild('estadoTpl', { static: true }) estadoTpl: TemplateRef<any>;
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
              private formBuilder: FormBuilder

              ) { }

  ngOnInit(): void {

    this.Columns = [
      { key: 'key', title: '#',width:"3%"},
      { key: 'persona.nombre', title: 'Nombre',width:"25%" },
      { key: 'persona.telefono', title: 'Telefono',width:"10%" },
      { key: 'rol', title: 'Rol', cellTemplate:this.rolTpl,width:"15%"},
      { key: 'usuario', title: 'Usuario',width:"20%" },
      { key: 'estado', title: 'Estado', cellTemplate:this.estadoTpl,width:"10%"},
      { key: 'opciones', title: 'Opciones',cellTemplate: this.actionTpl,width:"10%"},
    ];

    var per=new Persona();
      per.nombre="Martha Rosa Diaz Martinez";
      per.direccion="calle 16B # 27-05 villa corelca";
      per.numeroDocumento="1065824874";
      per.tipoDocumento=TipoDocumentos.CC;
      per.nacionalidad="colombia";
      per.telefono="3154335567";
      per.email="elmer.fuentes@hotmail.com";
      per.expedicionDocumento="2020-10-02";
      var per2=new Persona();
      per2.nombre="Helmer Segunfo Fuentes Alvarado";
      per2.direccion="villa corelca";
      per2.numeroDocumento="1065824874";
      per2.tipoDocumento=TipoDocumentos.CC;
      per2.nacionalidad="colombia";
      per2.telefono="31450596908"
      per2.email="elmer.fuentes@hotmail.com";
      per2.expedicionDocumento="2020-10-02";


    this.listaEmpleado=[
      {estado:EstadoEmpleado.Activo,rol:RolEnums.Auditor,key:1,password:'',remmemberPassword:'',usuario:'helmerfa',
      persona:per

      },
      {estado:EstadoEmpleado.Inactivo,rol:RolEnums.Coordinador,key:2,password:'',remmemberPassword:'',usuario:'',persona:per},
      {estado:EstadoEmpleado.Activo,rol:RolEnums.Escribiente,key:3,password:'',remmemberPassword:'',usuario:'',persona:per2},
      {estado:EstadoEmpleado.Inactivo,rol:RolEnums.Escribiente,key:4,password:'',remmemberPassword:'',usuario:'',persona:per},
      {estado:EstadoEmpleado.Activo,rol:RolEnums.Auditor,key:5,password:'',remmemberPassword:'',usuario:'',persona:per}
    ]

    this.buildForm();


  }

  buildForm() {
    this.formEdit = this.formBuilder.group({
      direccion:['', [Validators.required]],
      telefono: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      fechaFinalizacion: [''],
      email: ['', [Validators.required]]
    });
  }

  loadEmpleados(){
    this._ServiceGeneric.getRemove<ResponseHttp<Empleado>>(null,'èmpleado')
    .subscribe(res=>this.listaEmpleado=res.data as Empleado[]);
  }

  showEmpleado(empleado:Empleado){
  this.empleado=empleado
  this.telefono.setValue(empleado.persona.telefono);
  this.direccion.setValue(empleado.persona.direccion);
  this.email.setValue(empleado.persona.email);
  this.fechaFinalizacion.setValue(empleado.finCargo);
  }

  delete(empleado:Empleado){
    this._ServiceGeneric.getRemove<ResponseHttp<Empleado>>(empleado.usuario,`empleado`,null,'delete')
    .subscribe(res=>{
      this.notificacion.MensajeSuccess(res.message);
    });
  }

  UpdatePersonaYEmpleado(){
    var requestPersonaUpdate:any={
      telefono:this.telefono.value,
      email:this.email.value,
      direccion:this.direccion.value,
      documento:this.empleado.persona.numeroDocumento
      }

    var requestEmpleadoUpdate:any={
      documento:this.empleado.persona.numeroDocumento,
      fechaFinalizacion:this.fechaFinalizacion.value
    }

    if (this.formEdit.invalid) {
      this.notificacion.MensajeError("Formulario Invalido");
      return;
    }

    this._ServiceGeneric.postPatch<ResponseHttp<Persona>>(`persona`,requestPersonaUpdate,null,'put')
    .subscribe(res=>{
      this._ServiceGeneric.postPatch<ResponseHttp<Empleado>>(`empleado`,requestEmpleadoUpdate,null,'put')
      .subscribe(res=>{
        this.notificacion.MensajeSuccess("Actualización Exitosa");
        this.botonCerrar.nativeElement.click();
        this.loadEmpleados();
      })
    })

  }

  updateState(empleado:Empleado){
    var requesStateEmpleado:any={
      usuario:empleado.usuario,
      estado:empleado.estado
    }

  this._ServiceGeneric.postPatch(`empleado`,requesStateEmpleado,null,'put')
  .subscribe(res=>{
    this.notificacion.MensajeSuccess("Estado Actualizado");
    this.loadEmpleados();
  })

  }

  RolEmpleado(valor:any):string{
    return RolEnums[valor];
  }

  stateEmpleado(valor:any):string{
    return EstadoEmpleado[valor]
  }
  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  get telefono() { return this.formEdit.get('telefono'); }
  get email() { return this.formEdit.get('email'); }
  get direccion() { return this.formEdit.get('direccion'); }
  get fechaFinalizacion() { return this.formEdit.get('fechaFinalizacion'); }


}
