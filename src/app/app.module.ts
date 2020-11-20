import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { EventosService } from './services/eventos.service';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DataserviceService } from './services/dataservice.service';
import { RouterModule } from '@angular/router';
import { routes } from './routes/app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventosComponent } from './pages/eventosincidencia/eventos.component';
import { HeaderComponent } from './components/header.component';
import { FooterComponent } from './components/footer.component';
import { BotonestabComponent } from './components/botonestab.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EventoslistadoComponent } from './pages/eventosincidencia/eventoslistado/eventoslistado.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { EventosinformativolistadoComponent } from './pages/eventosinformativo/eventoslistadoinformativo/eventosinformativolistado.component';
import { EventosinformativoComponent } from './pages/eventosinformativo/eventosinformativo.component';
import { DetalleeventoslistadoComponent } from './pages/eventosincidencia/eventoslistado/detalleeventoslistado.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DetalleeventoslistadoInformativoComponent } from './pages/eventosinformativo/eventoslistadoinformativo/detalleeventoslistadoinformativo.component';
import { AdministracionComponent } from './pages/administracion/administracion.component';
import { ListaPersonasComponent } from './pages/administracion/listapersonas.component';
import { DetallePersonaAdminComponent } from './pages/administracion/detallepersonaadmin.component';
import { SimpleTimer } from 'ng2-simple-timer';
import { ListagruporesolutorComponent } from './pages/administracion/listagruporesolutor/listagruporesolutor.component';
import { ListaservicioafectadoComponent } from './pages/administracion/listaservicioafectado/listaservicioafectado.component';
import { AyudaComponent } from './components/ayuda.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EventosComponent,
    HeaderComponent,
    FooterComponent,
    BotonestabComponent,
    EventoslistadoComponent,
    EventosinformativolistadoComponent,
    EventosinformativoComponent,
    DetalleeventoslistadoComponent,
    DetalleeventoslistadoInformativoComponent,
    AdministracionComponent,
    ListaPersonasComponent,
    DetallePersonaAdminComponent,
    ListagruporesolutorComponent,
    ListaservicioafectadoComponent,
    AyudaComponent
  ],
  imports: [
    NgxMaterialTimepickerModule,
    CKEditorModule,
    NgxDatatableModule,
    NgbModalModule,
    NgbModule,
    MatTabsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: 'reload' }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule

  ],
  exports: [
    RouterModule
  ],
  providers: [
    DataserviceService,
    EventosService,
    SimpleTimer
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
