import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NgForm,
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Constantes } from '../../models/constantes.model';

import { Personas } from '../../models/personas';
import { PersonasService } from 'src/app/services/personas.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Roles } from 'src/app/models/roles';

@Component({
  selector: 'app-detallepersonaadmin',
  templateUrl: './detallepersonaadmin.component.html',
})
export class DetallePersonaAdminComponent implements OnInit {
  public _opened: boolean = false;
  isSubmittedTurno = false;
  closeResult = '';
  registro: Personas = new Personas();

  public Editor = ClassicEditor;
  dias: { name: string; value: string; checked: boolean }[];
  id_persona: string;

  periodetalle: any[];
  categoperiod: any;
  periodcate: any;

  public onReady(editor) {
    editor.ui
      .getEditableElement()
      .parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
      );
  }

  PHP_API_SERVER = Constantes.API_SERVER; //URL del servicio
  rolname: Roles = new Roles();
  datosborrado: string;
  numero: number;
  final: Observable<Object>;
  ficheros: Personas = new Personas();
  imageURL: string;
  uploadForm: FormGroup;
  datosFile: string;
  imageSrc: any;
  roles: Roles[];

  modifyPersona = new FormGroup({
    id_persona: new FormControl(),
    nombres: new FormControl(),
    telefono: new FormControl(),
    email: new FormControl(),
    direccion: new FormControl(),
    id_rol: new FormControl(),
    password: new FormControl(),
  });
  formFileUp = new FormGroup({
    id_persona: new FormControl(''),
    imagen: new FormControl(''),
  });

  constructor(
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private personasServicio: PersonasService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  hideLoadingSpinner() {
    this.spinner.hide();
  }
  ngOnInit() {
    this.getRol();

    const tokenid = this.activatedRoute.snapshot.paramMap.get('tokenid');

    this.personasServicio
      .getDetallePersona(tokenid)
      .subscribe((respuesta: Personas) => {
        this.registro = respuesta;

        this.formFileUp = this.fb.group({
          id_persona: [this.registro.tokenid, Validators.required],
          imagen: ['', Validators.required],
        });

        this.modifyPersona = this.fb.group({
          id_persona: [this.registro.tokenid],
          nombres: [this.registro.nombres, Validators.required],
          telefono: [this.registro.telefono],
          email: [this.registro.email, Validators.required],
          direccion: [this.registro.direccion],
          id_rol: [this.registro.id_rol, Validators.required],
          password: [this.registro.password, Validators.required],
        });
      });
    this.hideLoadingSpinner();
  }

  getRol() {
    this.personasServicio.getRoles().subscribe((resp: any) => {
      this.roles = resp;
    });
  }

  makeid(length) {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  recarga() {
    location.reload();
  }



  updatePersona() {
    if (this.modifyPersona.valid) {
      this.isSubmittedTurno = true;
      const valor = JSON.stringify(this.modifyPersona.value);

      this.personasServicio
        .guardarModifyPersona(valor)
        .subscribe((respuesta) => {
          Swal.fire({
            title: 'Registro actualizado',
            text: 'Se ha actualizado un registro ',
            icon: 'success',
            showConfirmButton: true,
          }),
            this.recarga();
        });
      this.hideLoadingSpinner();
    }
  }

  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      Swal.fire({
        text: 'Solo puede cargar imágenes!!',
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
    this.imageSrc = reader.result;
    const id_persona = this.formFileUp.value.id_persona;
    this.personasServicio.getFileUploaded(id_persona);

    this.datosFile = JSON.stringify({
      id_persona: id_persona,
      imagen: this.imageSrc,
    });
    this.personasServicio.updateRegistroFile(this.datosFile).subscribe();
    Swal.fire({
      text: 'Imagen actualizada, un momento, por favor...',
      icon: 'success',
      timer: 7000,
      allowOutsideClick: false,
      showConfirmButton: false,
    }).then(function () {
      location.reload();
    });
  }

  _toggleSidebar() {
    this._opened = !this._opened;
  }
}
