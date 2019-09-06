import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

import { UsuarioComponent } from './components/usuario/usuario.component';
 import { USUARIO_ROUTES } from './components/usuario/usuario.routes';
 



const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { 
        path: 'usuario/:id', 
        component: UsuarioComponent, 
        children: USUARIO_ROUTES
    },

    { path: '**', pathMatch: 'full', redirectTo: 'home' },

    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];

export const APP_ROUTING = RouterModule.forRoot(routes);
