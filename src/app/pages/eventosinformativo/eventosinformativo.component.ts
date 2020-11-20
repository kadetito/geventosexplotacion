import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatTabGroup, MatTabChangeEvent } from '@angular/material/tabs';
@Component({
  selector: 'app-eventosinformativo',
  templateUrl: './eventosinformativo.component.html'
})
export class EventosinformativoComponent implements AfterViewInit, OnInit {

  
  ngAfterViewInit() {
    
  }
  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit() {

 
   
  }


}