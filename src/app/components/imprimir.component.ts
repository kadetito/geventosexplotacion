import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';

import { HomeService } from '../services/home.service';
import { Periodos } from '../models/periodos';
import { Constantes } from '../models/constantes.model';

@Component({
  selector: 'app-imprimir',
  templateUrl: './imprimir.component.html',
})
export class ImprimirComponent {
  @Input() public classe: string;

  datosenvio: string;
  public periodo: Periodos;

  constructor(private homeServicio: HomeService) {}

  //reload pagina al usar sweet alerts etc
  recarga() {
    location.reload();
  }

  /**
   * generar PDF
   *
   *
   *
   */
  generatePdf() {
    this.homeServicio.getPeriodo().subscribe((respuesta: Periodos) => {
      this.periodo = respuesta;
      this.periodo.pema_fecha = respuesta[0];
      this.periodo.clave_comun = respuesta[0];
      const clave_comun =
        Constantes.ARND +
        this.periodo.clave_comun['clave_comun'] +
        Constantes.BRND;

      Swal.fire({
        title: `¿Desea imprimir en PDF el informe?`,
        text: 'Confirme si desea imprimir el registro',
        icon: 'question',
        showConfirmButton: true,
        showCancelButton: true,
      }).then((respuesta) => {
        if (respuesta.value) {
          //mando los datos al servicio
          this.datosenvio = JSON.stringify({
            clave_comun: clave_comun,
            classe: this.classe,
          });
          this.homeServicio.setClavePDF(this.datosenvio).subscribe();

          Swal.fire({
            title: 'Documento PDF',
            text: 'El documento ha sido descargado',
            icon: 'success',
            showConfirmButton: false,
          });
          //, this.recarga();
        }
      });
    });
  }
}
