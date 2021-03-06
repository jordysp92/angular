import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuard } from '../services/guards/login.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuard ],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard'}},
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress'}},
            { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas'}},
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes tema'}},
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas'}},
            { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario'}},
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs'}},

            //Matanimiento
            { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usuarios'}},
            { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Hospitales'}},
            { path: 'medicos', component: MedicosComponent, data: { titulo: 'Medicos'}},
            { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar Medico'}},

            { path: '', redirectTo: '/dashboard', pathMatch: 'full'}
        ]
    },
];
export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes);