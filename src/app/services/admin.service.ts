import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constantes } from '../models/constantes.model';
import { NgxSpinnerService } from "ngx-spinner";

import { DataserviceService } from './dataservice.service';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  //constantes
  private PHP_API_SERVER = Constantes.API_SERVER; //URL del servicio
  public showSpinner: boolean = false;
   userTabLocation0 = localStorage.getItem('userTabLocationRB4');
  constructor(private spinner: NgxSpinnerService,private httpClient: HttpClient,private dataService: DataserviceService) { }

  showLoadingSpinner() {
    this.spinner.show();
  }
  
  hideLoadingSpinner() {
    this.spinner.hide();
  }

  getPersonas( id_persona:string ){

    return this.httpClient.get(`${ this.PHP_API_SERVER}/ajax/personas_detalle_idpersona.php?id_persona=${ id_persona }`);
  }
  
  guardarNuevancidencia(incidenciaForm){ 

    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/incidencia_crear.php`, JSON.stringify(incidenciaForm));
  }  

  crearNuevoInforme() {
   const id_persona = localStorage.getItem('id_persona');
   return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/crear_informe.php`, id_persona);
  }

  actualizarRegistro(datoregistro) {

      return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/crear_persona.php`, JSON.stringify(datoregistro));
  }

  actualizarRegistroListaCorreo(datoregistromail) {

    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/crear_lico.php`, JSON.stringify(datoregistromail));
  }
      
  

}
