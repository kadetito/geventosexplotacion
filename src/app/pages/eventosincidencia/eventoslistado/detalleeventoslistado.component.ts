import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { EventosService } from 'src/app/services/eventos.service';
import { DataserviceService } from 'src/app/services/dataservice.service';
import { EventosIncidencias } from '../../../models/eventosincidencia';
import { HttpClient } from '@angular/common/http';
import { Personas } from 'src/app/models/personas';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-detalleeventoslistado',
  templateUrl: './detalleeventoslistado.component.html'
})
export class DetalleeventoslistadoComponent implements OnInit {

  public Editor = ClassicEditor;

  Relacionados = new FormGroup(
    {
      id_evento: new FormControl(),
      gee_eventos_relacionados: new FormControl(),
    }
  );
  Modificacion = new FormGroup({
    id_evento: new FormControl(),
    gee_flag: new FormControl(),
    gee_tipo: new FormControl(),
    gee_fecha_inicio: new FormControl(),
    gee_hora_inicio: new FormControl(),
    gee_hora_inicio_indisponibilidad: new FormControl(),
    gee_fecha_fin: new FormControl(),
    gee_hora_fin_evento: new FormControl(),
    gee_hora_fin_indisponibilidad: new FormControl(),
    gee_origen: new FormControl(),
    gee_descripcion: new FormControl(),
    gee_servicio_afectado: new FormControl(),
    gee_ticket: new FormControl(),
    gee_nivel_defcon: new FormControl(),
    gee_estado: new FormControl(),
    gee_contenido: new FormControl(),
    gee_resolutor: new FormControl(),
    id_persona: new FormControl()

  }


  );
  rowdetalle: EventosIncidencias = new EventosIncidencias();
  user: Personas = new Personas();

  flags: any = [];
  tipos: any = [];
  tickets: any = [];
  servicios: any = [];
  gruposresolutores: any = [];
  origenes: any = [];
  estados: any = [];
  estatus: boolean;
  norelac: any = [];
  yarelac: any = [];
  rows = [];

  temp = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private eventosService: EventosService,
    private dataService: DataserviceService,
    private httpClient: HttpClient,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,

  ) { }

  showLoadingSpinner() {
    this.spinner.show();
  }

  hideLoadingSpinner() {
    this.spinner.hide();
  }


  ngOnInit(): void {
    this.listaeventosYaRelac();
    this.listaeventos();
    this.getUsuario();
    this.getFlag();
    this.getTipo();
    this.getOrigen();
    this.getEstado();
    this.getTicket();
    this.getServicio();
    this.detalleEvento();
    this.getGrupoResolutor();
  }

  getUsuario() {
    const id_persona = localStorage.getItem('id_persona');
    this.dataService.getUserId(id_persona)
      .subscribe((resp: Personas) => {
        this.user = resp;
      });

  }

  recarga() {
    location.reload();
  }

  guardaModificacion() {
    const valor = JSON.stringify(this.Modificacion.value);

    this.eventosService.guardarModificacion(valor).subscribe(respuesta => {
      Swal.fire({
        title: 'Evento modificado',
        text: 'El evento ha sido modificado con éxito',
        icon: 'success',
        showConfirmButton: true
      })
        ,
        this.recarga();
    });
  }

  getFlag() {
    this.eventosService.getFlags().subscribe((respuesta: any) => {
      this.flags = respuesta;
    });
  }

  getTipo() {
    this.eventosService.getTipos().subscribe((respuesta: any) => {
      this.tipos = respuesta;
    });
  }

  getOrigen() {
    this.eventosService.getOrigenes().subscribe((respuesta: any) => {
      this.origenes = respuesta;
    }

    );
  }
  getEstado() {
    this.eventosService.getEstados().subscribe((respuesta: any) => {
      this.estados = respuesta;
    }

    );

  }

  getTicket() {
    this.eventosService.getTickets().subscribe((respuesta: any) => {
      this.tickets = respuesta;
    }

    );
  }


  getGrupoResolutor() {
    this.eventosService.getGrupos().subscribe((respuesta: any) => {
      this.gruposresolutores = respuesta;
    }
    );
  }

  getServicio() {
    this.eventosService.getServicios().subscribe((respuesta: any) => {
      this.servicios = respuesta;
    }

    );
  }

  public onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()

    );
  }

  getCombo2() {
    this.estatus = false;
    const estadovalor = this.Modificacion.controls['gee_estado'].value;
    if (estadovalor == 4) {
      this.estatus = true;
    }
  }


  //solo los eventos que no esten ya relacionados
  listaeventos() {
    const tokenid = this.activatedRoute.snapshot.paramMap.get('tokenid');
    this.eventosService.getListadoRelacionados(tokenid).subscribe((respuesta: any) => {
      this.norelac = respuesta;
    }
    );
  }

  saveEventosRelacionados() {
    //update de este evento con el estado a 4
    //y creacion de vinculaciones con los eventos 
    const valor = JSON.stringify(this.Relacionados.value);
    this.eventosService.guardarEventosRelacionados(valor).subscribe(respuesta => {
      Swal.fire({
        title: 'Evento relacionado',
        text: 'El evento ha sido relacionado con éxito',
        icon: 'success',
        showConfirmButton: false
      })
        ,
        this.recarga();
    });
  }

  listaeventosYaRelac() {
    const tokenid = this.activatedRoute.snapshot.paramMap.get('tokenid');
    this.eventosService.getListadoYaRelacionados(tokenid).subscribe((respuesta: any) => {
      this.yarelac = respuesta;
    }
    );
  }


  detalleEvento() {
    const tokenid = this.activatedRoute.snapshot.paramMap.get('tokenid');

    this.eventosService.getDetalleEvento(tokenid)
      .subscribe((respuesta: EventosIncidencias) => {
        this.rowdetalle = respuesta;
        this.Modificacion = this.fb.group({
          id_evento: [tokenid],
          gee_flag: [this.rowdetalle.gee_flag, Validators.required],
          gee_tipo: [this.rowdetalle.gee_tipo, Validators.required],
          gee_fecha_inicio: [this.rowdetalle.gee_fecha_inicio, Validators.required],
          gee_hora_inicio: [this.rowdetalle.gee_hora_inicio, Validators.required],
          gee_hora_inicio_indisponibilidad: [this.rowdetalle.gee_hora_inicio_indisponibilidad],
          gee_fecha_fin: [this.rowdetalle.gee_fecha_fin],
          gee_hora_fin_evento: [this.rowdetalle.gee_hora_fin_evento, Validators.required],
          gee_hora_fin_indisponibilidad: [this.rowdetalle.gee_hora_fin_indisponibilidad],
          gee_origen: [this.rowdetalle.gee_origen, Validators.required],
          gee_descripcion: [this.rowdetalle.gee_descripcion, Validators.required],
          gee_servicio_afectado: [this.rowdetalle.gee_servicio_afectado, Validators.required],
          gee_ticket: [this.rowdetalle.gee_ticket, Validators.required],
          gee_nivel_defcon: [this.rowdetalle.gee_nivel_defcon, Validators.required],
          gee_estado: [this.rowdetalle.gee_estado, Validators.required],
          gee_contenido: [this.rowdetalle.gee_contenido, Validators.required],
          gee_resolutor: [this.rowdetalle.gee_resolutor, Validators.required],
          id_persona: [this.rowdetalle.id_persona, Validators.required]
        });

        this.Relacionados = this.fb.group({
          id_evento: [tokenid],
          gee_eventos_relacionados: ['', Validators.required],
        });


      });
    this.hideLoadingSpinner();
  }

}
