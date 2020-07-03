import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../service.index';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {


  constructor( public usuarioService: UsuarioService, 
    public router: Router){

  }

  canActivate() {
  
    if( this.usuarioService.estalogueado()){
      return true;
    }
    this.router.navigate(['/login'])
    return false;
  }
  
}
