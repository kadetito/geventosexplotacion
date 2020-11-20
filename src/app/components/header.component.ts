import { Component, OnInit } from '@angular/core';
import { Constantes } from '../models/constantes.model';
import { HttpClient } from '@angular/common/http';
import { DataserviceService } from '../services/dataservice.service';
import { Router } from '@angular/router';
import { Personas } from '../models/personas';
import { Subscription } from 'rxjs';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  closeResult = '';
  user: Personas = new Personas();
  modalOptions: NgbModalOptions;
  PHP_API_SERVER = Constantes.API_SERVER; //URL del servicio
  constructor(
    private httpClient: HttpClient,
    private dataService: DataserviceService,
    private router: Router,
    private modalService: NgbModal
  ) { 

    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      size: 'lg',
    };

  }

  ngOnInit() {
    this.getUsuario();
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

  getUsuario() {
    const id_persona = localStorage.getItem('id_persona');
    if (id_persona === null) {
      const redirect = this.dataService.redirectUrl
        ? this.dataService.redirectUrl
        : '/login';
      this.router.navigate([redirect]);
    }
    this.dataService.getUserId(id_persona).subscribe((resp: Personas) => {
      this.user = resp;
      this.user.id_persona = resp[0];
      const identidad =
        this.makeid(5) + Constantes.ARND + id_persona + Constantes.BRND;
      this.user.id_persona = identidad;
    });
  }


  Logout() {
    localStorage.clear();
    localStorage.removeItem('token');
    localStorage.removeItem('id_rol');
    localStorage.removeItem('id_persona');
    localStorage.removeItem('valorTurno');
    const redirect = this.dataService.redirectUrl
      ? this.dataService.redirectUrl
      : '/login';
    this.router.navigate([redirect]);
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


}
