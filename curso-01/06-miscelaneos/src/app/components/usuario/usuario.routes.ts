import { Routes } from '@angular/router';
import { UsuarioDetalleComponent } from './usuario-detalle.component';
import { UsuarioNuevoComponent } from './usuario-nuevo.component';
import { UsuarioEditarComponent } from './usuario-editar.component';

export const USUARIO_ROUTES: Routes = [
    {
        path: 'nuevo', component: UsuarioNuevoComponent
    },
    {
        path: 'editar', component: UsuarioEditarComponent
    },
    {
        path: 'detalle', component: UsuarioDetalleComponent
    },
    { path: '**', pathMatch: 'full', redirectTo: 'nuevo' }

    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];
