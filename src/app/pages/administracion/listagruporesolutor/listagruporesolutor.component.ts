import {
  Component,
  OnInit,
  HostListener,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { NgxSpinnerService } from 'ngx-spinner';

import { DatatableComponent } from '@swimlane/ngx-datatable';
import { DataserviceService } from '../../../services/dataservice.service';
import Swal from 'sweetalert2';

import { ColumnMode } from '@swimlane/ngx-datatable';
import { Personas } from '../../../models/personas';
import { GruposResolutores } from '../../../models/gruposresolutores';
import { PersonasService } from 'src/app/services/personas.service';
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalOptions,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import {
  Validators,
  FormControl,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { Roles } from 'src/app/models/roles';
import { EventosService } from 'src/app/services/eventos.service';



@Component({
  selector: 'app-listagruporesolutor',
  templateUrl: './listagruporesolutor.component.html'
})
export class ListagruporesolutorComponent implements OnInit {

  public _opened: boolean = false;
  closeResult = '';
  isSubmittedTurno = false;
  rows = [];
  temp = [];
  my_messages = {
    emptyMessage: '',
    totalMessage: '',
  };
  campo: any;
  valor: any;
  ever: any;
  roles: Roles[];
  datos: string;
  editing = {};
  rolname: Roles = new Roles();

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  id_grupo_resolutor: any;

    //click fuera del input
    @HostListener('document:click', ['$event'])
    clickout(event) { }
  
  id_persona: any;
  datosFile: any;
  datosborrado: string;
  ColumnMode = ColumnMode;
  user: Personas = new Personas();
  modalOptions: NgbModalOptions;
  fileSrc: any;
  uploadForm = new FormGroup({
    fileUpload: new FormControl()
  });

  constructor(
    private personasServicio: PersonasService,
    private fb: FormBuilder,
    private eventosService: EventosService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private dataService: DataserviceService
  ) {
    this.eventosService.getListadoGruposResolutores((data) => {
      this.temp = [...data];
      this.rows = data;
    });

    this.uploadForm = fb.group({
      fileUpload: ['', Validators.required],
    });

    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      size: 'lg',
    };
  }


  ngOnInit(): void {
    this.getUsuario();
    this.getRol();
  }

  ngOnDestroy() {
    this.personasServicio.unsubscribe();
  }

  /**
   * reload pagina al usar sweet alerts etc
   */
  recarga() {
    location.reload();
  }

  getUsuario() {
    const id_persona = localStorage.getItem('id_persona');
    this.dataService.getUserId(id_persona).subscribe((resp: Personas) => {
      this.user = resp;
    });
  }

  getRol() {
    this.personasServicio.getRoles().subscribe((resp: any) => {
      this.roles = resp;
    });
  }









  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;

    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      Swal.fire({
        text: 'Solo puede cargar CSV!!',
        icon: 'error',
        showConfirmButton: true,
      });
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }




  _handleReaderLoaded(e) {
    let reader = e.target;
    this.fileSrc = reader.result;


    this.datosFile = JSON.stringify({
      fileUpload: this.fileSrc,
    });

    this.eventosService.enviarArchivoUploadMasivo(this.datosFile).subscribe();
    Swal.fire({
      text: 'Archivo añadido, un momento, por favor...',
      icon: 'success',
      timer: 7000,
      allowOutsideClick: false,
      showConfirmButton: false,
    }).then(function () {
      location.reload();
    });
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

  // actualizacion filtro busqueda
  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return (
        d.id_grupo_resolutor.toLowerCase().indexOf(val) !== -1 ||
        d.grupo_resolutor_nombre.toLowerCase().indexOf(val) !== -1 ||
        !val
      );
    });
    // actualizamos las rows
    this.rows = temp;
    // Cuando cambie el filtro, regresa a la primera página.
    this.table.offset = 0;
  }

  //eliminar registro
  borrarRegistro(registro: GruposResolutores, i: string) {
    Swal.fire({
      title: `¿Desea borrar el registro número ${registro.id_grupo_resolutor}`,
      text: 'Confirme si desea borrar el registro',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }).then((respuesta) => {
      if (respuesta.value) {
        this.datosborrado = JSON.stringify({ id_grupo_resolutor: registro.id_grupo_resolutor });
        this.eventosService.deleteGrupoResolutor(this.datosborrado).subscribe();

        Swal.fire({
          title: registro.id_grupo_resolutor,
          text: 'Registro eliminado',
          icon: 'success',
          showConfirmButton: false,
        }),
          this.recarga();
      }
    });
  }

   /**
   * actualizacion campos inline
   */
  updateValue(event, cell, rowIndex) {
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    this.campo = cell;
    this.id_grupo_resolutor = event.target.title;
    this.valor = event.target.value;
    (this.ever = this.campo), this.valor, this.id_grupo_resolutor;
    this.datos = JSON.stringify({
      campo: this.campo,
      valor: this.valor,
      id_grupo_resolutor: this.id_grupo_resolutor,
    });

    this.eventosService.updateCamposGrupos(this.datos).subscribe((datos) => {
      Swal.fire({
        text: 'Registro actualizado',
        icon: 'success',
        showConfirmButton: false,
      }),
        this.recarga();
    });
  }



  _toggleSidebar() {
    this._opened = !this._opened;
  }
}
