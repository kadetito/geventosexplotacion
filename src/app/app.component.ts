import { Component } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gee';


  constructor() { 
    let i = 0;
    (function repeat(times){
      if (++i > 5) return;
      setTimeout(function(){   
        localStorage.removeItem('id_persona');
        localStorage.removeItem('token');
        localStorage.removeItem('id_rol');
        repeat();
      }, 3600000);
    })();

  }




}