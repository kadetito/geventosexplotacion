import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild, HostListener } from '@angular/core';
import { Personas } from 'src/app/models/personas';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataserviceService } from 'src/app/services/dataservice.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { NgbModalOptions, NgbModal, ModalDismissReasons, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { EventosService } from 'src/app/services/eventos.service';


@Component({
  selector: 'app-eventosinformativolistado',
  templateUrl: './eventosinformativolistado.component.html',
  
})
export class EventosinformativolistadoComponent implements OnInit {

  public Editor = ClassicEditor;

  rows = [];
  temp = [];
  flags: any=[];
  tipos: any=[];
  tickets: any=[];
  servicios: any=[];
  origenes: any=[];
  estados: any=[];
  gruposresolutores: any=[];
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  ColumnMode = ColumnMode;
  campo: any;
  id_persona: any;
  valor: any;
  ever: any;
  req: any;
  datos: string;
  expanded: any = {};
  user: Personas = new Personas();
  datosborrado: any;
  closeResult = '';
  id_acti: any;
  acti_user: Personas = new Personas();
  pers: any;
  isSubmittedTurno = false; //Informa de que no se envia formulario
  modalOptions: NgbModalOptions; 
  model: NgbDateStruct;

  eventosForm = new FormGroup({
    id_persona: new FormControl(),
   gee_fecha_inicio: new FormControl(),
    gee_hora_inicio: new FormControl(),
    gee_hora_inicio_indisponibilidad: new FormControl(),
    gee_fecha_fin: new FormControl(),
    gee_hora_fin_evento: new FormControl(),
    gee_hora_fin_indisponibilidad: new FormControl(),
    gee_origen: new FormControl(),
    gee_ticket: new FormControl(),
    gee_descripcion: new FormControl(),
    gee_contenido: new FormControl(),
    gee_nivel_defcon: new FormControl(),
    gee_servicio_afectado: new FormControl(),
    gee_estado: new FormControl(),
    gee_flag: new FormControl(),
   // gee_tipo: new FormControl(),
    gee_resolutor: new FormControl(),
  }); //campos formulario modal

  //ultiactu: UltimasActuaciones[] = [];

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private eventosService: EventosService,
    private dataService: DataserviceService
  ) {
    /**
    * recibimos el listado
    */

    this.eventosService.getListadoInformativo((data) => {
      this.temp = [...data];
      this.rows = data;
      this.user = data[0]['id_persona'];
      this.dataService
        .getUserIdbyunicId(this.user)
        .subscribe((resp: Personas) => {
          this.acti_user = resp;
        });
    });

    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      size: 'lg',
    };
  }

  public onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }


  getGrupoResolutor()
  {
    this.eventosService.getGrupos().subscribe((respuesta: any) =>{
      this.gruposresolutores = respuesta;
    }
    );
  }

  getUsuario() {
    const id_persona = localStorage.getItem('id_persona');

    this.dataService.getUserId(id_persona)
      .subscribe((resp: Personas) => {
        this.user = resp;
  //validacion del formulario
        this.eventosForm = this.fb.group({
          id_persona: [this.user.id_persona],
          gee_fecha_inicio: ['', Validators.required],
          gee_hora_inicio: ['', Validators.required],
          gee_hora_inicio_indisponibilidad: ['', Validators.required],
          gee_fecha_fin: [''],
          gee_hora_fin_evento: ['', Validators.required],
          gee_ticket: ['', Validators.required],
          gee_estado: [''],
          gee_descripcion: ['', Validators.required],
          gee_flag: ['N', Validators.required],
          gee_tipo: [''],
          gee_origen: ['', Validators.required],
          gee_contenido: ['', Validators.required],
          gee_nivel_defcon: ['', Validators.required],
          gee_hora_fin_indisponibilidad: ['', Validators.required],
          gee_servicio_afectado: ['', Validators.required],
          gee_resolutor: ['', Validators.required],

        });
      });
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {}

  ngOnInit(): void {
    this.getUsuario();
    this.getFlag();
    this.getTipo();
    this.getOrigen();
    this.getEstado();
    this.getTicket();
    this.getServicio();
    this.getGrupoResolutor();
  }

  ngOnDestroy() {
    this.eventosService.unsubscribe();
  }

    /**
     * reload pagina al usar sweet alerts etc
     */

  recarga() {
    location.reload();
  }



  //actualizacion filtro busqueda

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      if (d && d.gee_fecha_inicio && d.gee_ticket && d.gee_descripcion) {
        return (
          d.gee_fecha_inicio.toLowerCase().indexOf(val) !== -1 ||
          d.gee_ticket.toLowerCase().indexOf(val) !== -1 ||
          d.gee_descripcion.toLowerCase().indexOf(val) !== -1 ||
          !val
        );
      }
    });

    // actualizamos las rows
    this.rows = temp;

    // Cuando cambie el filtro, regresa a la primera página.

    this.table.offset = 0;
  }

  open(tiket) {
    this.modalService.open(tiket, this.modalOptions).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  guardarEventoInformativo() {
    
    if (this.eventosForm.valid) {
      this.isSubmittedTurno = true;
      const valor = JSON.stringify(this.eventosForm.value);
      this.eventosService.guardarNuevoEventoInformativo(valor).subscribe((respuesta) => {
        Swal.fire({
          title: 'Registro creado',
          text: 'Se ha creado un nuevo evento ',
          icon: 'success',
          showConfirmButton: true,
        }),
          this.recarga();
      });
    }
  }

  //eliminar registro

  borrarRegistro(tokenid : String) {
    
    Swal.fire({
      title: `¿Desea borrar el evento?`,
      text: 'Confirme si desea borrar el evento',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }).then((respuesta) => {
      if (respuesta.value) {
        this.datosborrado = JSON.stringify({ tokenid: tokenid });
  
        this.eventosService.deleteEvento(this.datosborrado).subscribe();
        Swal.fire({
          title: '' ,
          text: 'Evento eliminado',
          icon: 'success',
          showConfirmButton: false,
        }),
          this.recarga();
      }
    });
  }
  getFlag()
  {
    this.eventosService.getFlags().subscribe((respuesta: any) =>{
      this.flags = respuesta;
    });
  }
  getTipo()
  {
    this.eventosService.getTipos().subscribe((respuesta: any) =>{
      this.tipos = respuesta;
    });
  }

  getOrigen()
  {
    this.eventosService.getOrigenes().subscribe((respuesta: any) =>{
      this.origenes = respuesta;
    }

    );
  }
  getEstado()
  {
    this.eventosService.getEstados().subscribe((respuesta: any) =>{
      this.estados = respuesta;
    }

    );
  }

  getTicket()
  {
    this.eventosService.getTickets().subscribe((respuesta: any) =>{
      this.tickets = respuesta
    }

    );
  }

  getServicio()
  {
    this.eventosService.getServicios().subscribe((respuesta: any) =>{
      this.servicios = respuesta;
    }

    );
  } 

}

