import { Routes, RouterModule} from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { EventosComponent } from '../pages/eventosincidencia/eventos.component';
import { AuthguardGuard } from '../guards/authguard.guard';
import { EventosinformativoComponent } from '../pages/eventosinformativo/eventosinformativo.component';
import { DetalleeventoslistadoComponent } from '../pages/eventosincidencia/eventoslistado/detalleeventoslistado.component';
import { DetalleeventoslistadoInformativoComponent } from '../pages/eventosinformativo/eventoslistadoinformativo/detalleeventoslistadoinformativo.component';
import { AdministracionComponent } from '../pages/administracion/administracion.component';
import { AuthGuardRole } from '../guards/rol.guard';
import { ListaPersonasComponent } from '../pages/administracion/listapersonas.component';
import { DetallePersonaAdminComponent } from '../pages/administracion/detallepersonaadmin.component';
import { ListagruporesolutorComponent } from '../pages/administracion/listagruporesolutor/listagruporesolutor.component';
import { ListaservicioafectadoComponent } from '../pages/administracion/listaservicioafectado/listaservicioafectado.component';
import { AyudaComponent } from '../components/ayuda.component';

export const routes: Routes = [
    { path: 'ayuda', component: AyudaComponent, canActivate:[AuthguardGuard]},

    { path: 'eventos', component: EventosComponent, canActivate:[AuthguardGuard]},
    { path: 'administracion' , component: AdministracionComponent, canActivate: [ AuthGuardRole ]},
    { path: 'listapersonas' , component: ListaPersonasComponent, canActivate: [ AuthGuardRole ] },
    { path: 'listagruporesolutor' , component: ListagruporesolutorComponent, canActivate: [ AuthGuardRole ] },
    { path: 'listaservicioafectado' , component: ListaservicioafectadoComponent, canActivate: [ AuthGuardRole ] },
    { path: 'detallepersonaadmin/:tokenid' , component: DetallePersonaAdminComponent, canActivate: [ AuthGuardRole ] },
    { path: 'informativos', component: EventosinformativoComponent, canActivate:[AuthguardGuard]},
    { path: 'detalleeventoslistado/:tokenid' , component: DetalleeventoslistadoComponent, canActivate:[AuthguardGuard]},
    { path: 'detalleeventoslistadoinformativo/:tokenid' , component: DetalleeventoslistadoInformativoComponent, canActivate:[AuthguardGuard]},
    { path: 'detalleeventosrelacionados/:tokenid' , component: DetalleeventoslistadoComponent, canActivate:[AuthguardGuard]},
    { path: 'detalleeventosrelacionadosinformativo/:tokenid' , component: DetalleeventoslistadoInformativoComponent, canActivate:[AuthguardGuard]},
    { path: 'login'   , component: LoginComponent },
    { path: '', pathMatch: 'full', redirectTo: '/login'},
    { path: '**', redirectTo: '/login' }
    
];
