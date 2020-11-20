import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatTabGroup, MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
})
export class EventosComponent implements AfterViewInit, OnInit {
  ngAfterViewInit() {}
  constructor(private spinner: NgxSpinnerService) {}

  ngOnInit() {}
}
