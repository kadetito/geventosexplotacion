import { Injectable } from '@angular/core';
import { Constantes } from '../models/constantes.model';
import { HttpClient } from '@angular/common/http';
import { DataserviceService } from './dataservice.service';
import { NgxSpinnerService } from 'ngx-spinner';

//import { UltimasActuaciones } from '../models/ultiactu';

import { map } from 'rxjs/operators';



@Injectable({

  providedIn: 'root'

})

export class EventosService {


  unsubscribe() {

  }



  //constantes

  private PHP_API_SERVER = Constantes.API_SERVER; //URL del servicio

  public showSpinner: boolean = false;

  userTabLocation0 = localStorage.getItem('userTabLocationRB4');

  constructor(private spinner: NgxSpinnerService, private httpClient: HttpClient, private dataService: DataserviceService) { }



  showLoadingSpinner() {

    this.spinner.show();

  }


  hideLoadingSpinner() {

    this.spinner.hide();

  }

  guardarCambioEstado(cambEstado) {



    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_estado.php`, cambEstado);

  }


  updateRegistroFile(datosFile) {
    return this.httpClient.post(
      `${this.PHP_API_SERVER}/ajax/update_file.php`,
      datosFile
    );
  }

  //EVENTOS

  deleteEvento(datosborrado) {


    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/delete_evento.php`, datosborrado);
  }


  guardarNuevoEvento(valor) {

    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/create_evento.php`, valor, { responseType: 'text' });

  }

  guardarNuevoEventoInformativo(valor) {


    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/create_eventoinformativo.php`, valor, { responseType: 'text' });

  }

  guardarModificacion(valor) {

    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_eventos_total.php`, valor);

  }
  guardarModificacionInformativo(valor) {

    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_informativo_total.php`, valor);

  }

  getDetalleEvento(tokenid) {
    this.showLoadingSpinner();
    return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/detalle_listado.php?tokenid=${tokenid}`);

  }


  getFlags() {
    const token = localStorage.getItem('token');
    const idpersona = localStorage.getItem('id_persona');
    return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/read_flags.php?token=${token}&idpersona=${idpersona}`);

  }
  getTipos() {
    const token = localStorage.getItem('token');
    const idpersona = localStorage.getItem('id_persona');
    return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/read_tipos.php?token=${token}&idpersona=${idpersona}`);

  }
  getOrigenes() {
    const token = localStorage.getItem('token');
    const idpersona = localStorage.getItem('id_persona');
    return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/read_origenes.php?token=${token}&idpersona=${idpersona}`);
  }
  getEstados() {
    const token = localStorage.getItem('token');
    const idpersona = localStorage.getItem('id_persona');
    return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/read_estados.php?token=${token}&idpersona=${idpersona}`);
  }
  getTickets() {
    const token = localStorage.getItem('token');
    const idpersona = localStorage.getItem('id_persona');
    return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/read_tickets.php?token=${token}&idpersona=${idpersona}`);
  }
  getServicios() {
    const token = localStorage.getItem('token');
    const idpersona = localStorage.getItem('id_persona');
    return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/read_servicios.php?token=${token}&idpersona=${idpersona}`);
  }

  getGrupos() {
    const token = localStorage.getItem('token');
    const idpersona = localStorage.getItem('id_persona');
    return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/read_gruposresolutores.php?token=${token}&idpersona=${idpersona}`);
  }

  getUltiActuToken(tokenid) {
    return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/read_ultiactu.php?tokenid=${tokenid}`)
  }

  getUltiActuImagen(id_ulac) {
    return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/read_ultiactu_imagen.php?id_ulac=${id_ulac}`)
  }

  enviarArchivoUploadMasivo(datosFile) {

    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/upload_masivo_grupos.php`, datosFile);
  }
  
  enviarArchivoUploadMasivoServ(datosFile) {
  
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/upload_masivo_serviciosa.php`, datosFile);
  }
  

  guardarNuevoAdjunto(datosFoto) {
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_ultiactu_archivo.php`, datosFoto, { responseType: 'text' });
  }

  guardarNuevaImagen(datosFoto) {
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_ultiactu_imagen.php`, datosFoto, { responseType: 'text' });
  }

  altaRegistroCapexFoto(datosFotoCapex) {

    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/crear_capex.php`, datosFotoCapex, { responseType: 'text' });

  }

  getImgCheck() {

    const clave = localStorage.getItem('ccom');

    return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/read_imba.php?clave=${clave}`);

  }

  getImgCapex() {

    const clave = localStorage.getItem('ccom');

    return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/read_capex.php?clave_comun=${clave}`);

  }

  getResumenBactch() {

    const clave = localStorage.getItem('ccom');
    return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/read_estado_resumen.php?clave_comun=${clave}`);

  }



  getImgBactch() {

    const clave_comun = localStorage.getItem('ccom');

    return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/read_imba.php?clave_comun=${clave_comun}`);

  }

  guardarResumen(valor) {
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_listado24horas.php`, valor);

  }

  guardarEventosRelacionados(valor) {
   
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/create_evento_relacionado.php`, valor);
  }


  guardarEventosRelacionadosInformativo(valor) {
 
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/create_evento_relacionado_informa.php`, valor);
  }


  getRegistroGrupoMatriz(id_matriz) {

    return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/detalle_matriz.php?id_matriz=${id_matriz}`);

  }



  getResolucionBatch() {

    const clave = localStorage.getItem('ccom');

    return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/read_resumen_rb4.php?clave=${clave}`);

  }

  getResolucionBatch2() {

    const clave = localStorage.getItem('ccom');

    return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/read_resumen2_rb4.php?clave=${clave}`);

  }


  getPeriodo() {

    return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/read_periodo.php`);

  }



  getResumen() {

    return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/read_resumen_rb4.php`);

  }


  //mostraremos solamente los que no esten relacionados con esta id_evento
  getListadoRelacionadosInformativo(tokenid) {
    const token = localStorage.getItem('token');
    const idpersona = localStorage.getItem('id_persona');
    return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/read_listadoeventos_norelac_info.php?tokenid=${tokenid}&token=${token}&idpersona=${idpersona}`);
  }
  //mostraremos solamente los que no esten relacionados con esta id_evento
  getListadoRelacionados(tokenid) {
    const token = localStorage.getItem('token');
    const idpersona = localStorage.getItem('id_persona');
    return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/read_listadoeventos_norelac.php?tokenid=${tokenid}&token=${token}&idpersona=${idpersona}`);
  }

  //eventos que ya han sido relacionados con esta id_evento
  getListadoYaRelacionadosInformativo(tokenid) {
    const token = localStorage.getItem('token');
    const idpersona = localStorage.getItem('id_persona');
    return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/read_listadoeventos_yarelac_info.php?tokenid=${tokenid}&token=${token}&idpersona=${idpersona}`);
  }

  //eventos que ya han sido relacionados con esta id_evento
  getListadoYaRelacionados(tokenid) {
    const token = localStorage.getItem('token');
    const idpersona = localStorage.getItem('id_persona');
    return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/read_listadoeventos_yarelac.php?tokenid=${tokenid}&token=${token}&idpersona=${idpersona}`);
  }


  getListado(cb) {
    const token = localStorage.getItem('token');
    const idpersona = localStorage.getItem('id_persona');
    const req = new XMLHttpRequest();

    this.showLoadingSpinner();

    req.open('GET', `${this.PHP_API_SERVER}/ajax/read_listadoeventos.php?token=${token}&idpersona=${idpersona}`);

    req.onload = () => {

      cb(JSON.parse(req.response));

      this.hideLoadingSpinner();
    };

    req.send();

  }

  
  getListadoServiciosAfectados(cb) {
    const token = localStorage.getItem('token');
    const idpersona = localStorage.getItem('id_persona');
    const req = new XMLHttpRequest();
    this.showLoadingSpinner();
    req.open('GET', `${this.PHP_API_SERVER}/ajax/read_serviciosafectados.php?token=${token}&idpersona=${idpersona}`);
    req.onload = () => {
      cb(JSON.parse(req.response));
      this.hideLoadingSpinner();
    };
    req.send();
  }

  getListadoGruposResolutores(cb) {
    const token = localStorage.getItem('token');
    const idpersona = localStorage.getItem('id_persona');
    const req = new XMLHttpRequest();
    this.showLoadingSpinner();
    req.open('GET', `${this.PHP_API_SERVER}/ajax/read_gruposresolutores.php?token=${token}&idpersona=${idpersona}`);
    req.onload = () => {
      cb(JSON.parse(req.response));
      this.hideLoadingSpinner();
    };
    req.send();
  }

  updateCamposGrupos(datos) {
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_gruposresolutores.php`, datos);
  }


  getListadoInformativo(cb) {
    const token = localStorage.getItem('token');
    const idpersona = localStorage.getItem('id_persona');
    const req = new XMLHttpRequest();

    this.showLoadingSpinner();

    req.open('GET', `${this.PHP_API_SERVER}/ajax/read_listadoInformativos.php?token=${token}&idpersona=${idpersona}`);

    req.onload = () => {

      cb(JSON.parse(req.response));

      this.hideLoadingSpinner();

    };

    req.send();



  }


  getListadocerradas(cb) {

    const req = new XMLHttpRequest();

    this.showLoadingSpinner();

    req.open('GET', `${this.PHP_API_SERVER}/ajax/read_listado24horascerradas.php`);

    req.onload = () => {

      cb(JSON.parse(req.response));

      this.hideLoadingSpinner();

    };

    req.send();


  }



  getListadoBatch1(cb) {

    const clave = localStorage.getItem('ccom');

    const req = new XMLHttpRequest();

    //this.showLoadingSpinner();

    req.open('GET', `${this.PHP_API_SERVER}/ajax/read_batch1.php?clave=${clave}`);

    req.onload = () => {

      cb(JSON.parse(req.response));

      this.hideLoadingSpinner();

    };

    req.send();

  }


  getListadoBatch2(cb) {

    const userTabLocation0 = localStorage.getItem('userTabLocationRB4');

    const clave = localStorage.getItem('ccom');

    const req = new XMLHttpRequest();

    req.open('GET', `${this.PHP_API_SERVER}/ajax/read_batch2.php?clave=${clave}`);

    req.onload = () => {

      cb(JSON.parse(req.response));

      this.hideLoadingSpinner();

    };

    req.send();



  }

  
  deleteServicioafectado(datosborrado) {

    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/delete_servicioafectado.php`, datosborrado);

  }
  deleteGrupoResolutor(datosborrado) {

    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/delete_gruporesolutor.php`, datosborrado);

  }

  deleteMatriz(datosborrado) {

    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/delete_matriz.php`, datosborrado);

  }


  guardarBatch(valor) {

    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/crear_batch1.php`, valor);

  }

  guardarMatriz(valor) {

    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/crear_matriz.php`, valor);

  }


  updateRegistroFoto(datosFoto) {

    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_imba.php`, datosFoto);

  }


  updateRegistroCapexFoto(datosFotoCapex) {

    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_capex.php`, datosFotoCapex, { responseType: 'text' });

  }

  updateResumenEstado1(valordefcon) {

    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_estado_resumen1.php`, valordefcon);

  }

  updateResumenEstado2(valordefcon) {

    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_estado_resumen2.php`, valordefcon);

  }

  updateResumenEstado3(valordefcon) {

    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_estado_resumen3.php`, valordefcon);

  }


  modiRegistroBacth(datos) {

    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_batch1.php`, datos);

  }

  modiRegistromatriz(datos) {

    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_matriz.php`, datos);

  }


  modiRegistroBacth2(datos) {

    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_batch2.php`, datos);

  }



}