import { Component, OnInit } from '@angular/core';
import { Personas } from '../models/personas';
import { Router } from '@angular/router';
import { DataserviceService } from '../services/dataservice.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-botonestab',
  templateUrl: './botonestab.component.html',
})
export class BotonestabComponent implements OnInit {
  user: Personas = new Personas();

  constructor(
    private httpClient: HttpClient,
    private dataService: DataserviceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUsuario();
  }

  getUsuario() {
    const id_persona = localStorage.getItem('id_persona');
    this.dataService.getUserId(id_persona).subscribe((resp: Personas) => {
      this.user = resp;
    });
  }
}
