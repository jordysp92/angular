import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { 
  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService,
  LoginGuard,
  SubirArchivoService

} from './service.index';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  providers:[
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    LoginGuard,
    SubirArchivoService
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ServiceModule { }
