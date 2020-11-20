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
import { DataserviceService } from '../../services/dataservice.service';
import Swal from 'sweetalert2';

import { ColumnMode } from '@swimlane/ngx-datatable';
import { Personas } from '../../models/personas';

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

@Component({
  selector: 'app-listapersonas',
  templateUrl: './listapersonas.component.html',
})
export class ListaPersonasComponent implements OnInit {
  public _opened: boolean = false;
  closeResult = '';
  my_messages = {
    emptyMessage: '',
    totalMessage: '',
  };
  isSubmittedTurno = false;
  rows = [];
  temp = [];

  rolname: Roles = new Roles();

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  id_esse: any;
  id_persona: any;
  campo: any;
  valor: any;
  ever: any;
  roles: Roles[];
  datos: string;
  editing = {};
  datosborrado: string;
  issues: any;
  ColumnMode = ColumnMode;
  nuevapersonaForm = new FormGroup({
    id_persona: new FormControl(),
    nombres: new FormControl(),
    telefono: new FormControl(),
    email: new FormControl(),
    direccion: new FormControl(),
    id_rol: new FormControl(),
    password: new FormControl(),
    imagen: new FormControl(),
  });
  //click fuera del input
  @HostListener('document:click', ['$event'])
  clickout(event) { }

  user: Personas = new Personas();
  modalOptions: NgbModalOptions;
  constructor(
    private personasServicio: PersonasService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private dataService: DataserviceService
  ) {
    this.personasServicio.getListado((data) => {
      this.temp = [...data];
      this.rows = data;
    });

    this.nuevapersonaForm = fb.group({
      id_persona: [''],
      nombres: ['', Validators.required],
      telefono: [''],
      email: ['', Validators.required],
      direccion: [''],
      id_rol: ['', Validators.required],
      password: ['', Validators.required],
      imagen: [''],
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

  /**
   * actualizacion campos inline
   */
  updateValue(event, cell, rowIndex) {
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    this.campo = cell;
    this.id_persona = event.target.title;

    this.valor = event.target.value;
    (this.ever = this.campo), this.valor, this.id_persona;
    this.datos = JSON.stringify({
      campo: this.campo,
      valor: this.valor,
      id_persona: this.id_persona,
    });

    this.personasServicio.updateCampos(this.datos).subscribe((datos) => {
      Swal.fire({
        text: 'Registro actualizado',
        icon: 'success',
        showConfirmButton: false,
      }),
        this.recarga();
    });
  }

  guardarPersona() {
    if (this.nuevapersonaForm.valid) {
      this.isSubmittedTurno = true;
      const valor = JSON.stringify(this.nuevapersonaForm.value);

      this.personasServicio
        .guardarNuevaPersona(valor)
        .subscribe((respuesta) => {
          Swal.fire({
            title: 'Registro creado',
            text: 'Se ha creado un registro de incidencia ',
            icon: 'success',
            showConfirmButton: true,
          }),
            this.recarga();
        });
    }
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
        d.nombres.toLowerCase().indexOf(val) !== -1 ||
        d.email.toLowerCase().indexOf(val) !== -1 ||
        !val
      );
    });
    // actualizamos las rows
    this.rows = temp;
    // Cuando cambie el filtro, regresa a la primera página.
    this.table.offset = 0;
  }

  //eliminar registro
  borrarRegistro(registro: Personas, i: string) {
    Swal.fire({
      title: `¿Desea borrar el registro número ${registro.id_persona}`,
      text: 'Confirme si desea borrar el registro',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }).then((respuesta) => {
      if (respuesta.value) {
        this.datosborrado = JSON.stringify({ id_persona: registro.id_persona });
        this.personasServicio.delete(this.datosborrado).subscribe();

        Swal.fire({
          title: registro.id_persona,
          text: 'Registro eliminado',
          icon: 'success',
          showConfirmButton: false,
        }),
          this.recarga();
      }
    });
  }

  _toggleSidebar() {
    this._opened = !this._opened;
  }
}
