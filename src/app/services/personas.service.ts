import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constantes } from '../models/constantes.model';
import { NgxSpinnerService } from "ngx-spinner";
import { DataserviceService } from './dataservice.service';


@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  unsubscribe() {
  }

  //constantes
  private PHP_API_SERVER = Constantes.API_SERVER; //URL del servicio
  public showSpinner: boolean = false;
  constructor(private spinner: NgxSpinnerService, private httpClient: HttpClient, private dataService: DataserviceService) { }

  showLoadingSpinner() {
    this.spinner.show();
  }

  hideLoadingSpinner() {
    this.spinner.hide();
  }

  getListado(cb) {

    const token = localStorage.getItem('token');
    const idpersona = localStorage.getItem('id_persona');

    const req = new XMLHttpRequest();
    this.showLoadingSpinner();
    req.open('GET', `${this.PHP_API_SERVER}/ajax/read_personas.php?token=${token}&idpersona=${idpersona}`);
    req.onload = () => {
      cb(JSON.parse(req.response));
      this.hideLoadingSpinner();
    };
    req.send();
  }

  getListadoColumnas() {

    return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/read_columnas_activas.php`);
  }

  getDetallePersona(tokenid) {
    this.showLoadingSpinner();
    return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/personas_detalle.php?tokenid=${tokenid}`);
  }
  getRoles() {

    return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/read_roles.php`);
  }
  getRolesbyID(id_rol) {
    return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/read_rolesbyid.php?id_rol=${id_rol}`);
  }

  guardarNuevaPersona(valor) {

    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/create_persona.php`, valor, { responseType: 'text' });
  }

  guardarModifyPersona(valor) {
    this.showLoadingSpinner();
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_persona_global.php`, valor);
  }

  getFileUploaded(id_persona) {
    return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/read_imagen_by_id.php?id_persona=${id_persona}`);
  }
  updateRegistroFile(datosFile) {
    this.showLoadingSpinner();
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_imagen_persona.php`, datosFile);
  }

  getDetalleInventario(tokenid: string) {
    return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/detalle_inventario.php?tokenid=${tokenid}`);
  }


  updateCampos(datos) {
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_personas.php`, datos);
  }

  updateRegistro(datos) {
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_inventario_total.php`, datos);
  }

  delete(datosborrado) {
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/delete_persona.php`, datosborrado);
  }

  guardarColumnas(ColumnasForm) {

    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_columnas.php`, JSON.stringify(ColumnasForm));
  }

  crearRegistro(valor) {
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/create_inventario.php`, valor);
  }



}
