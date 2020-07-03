import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import {HttpClient} from '@angular/common/http';
import { URL_SERVICE } from '../../config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';



@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor( public http: HttpClient, public router: Router ) { 
    this.cargarStorage();
  }


  estalogueado(){

    return  this.token.length > 0  ? true: false;
  }

  cargarStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }else{
      this.token = '';
      this.usuario = null;
    }
  }

  crearUsuario( usuario: Usuario){
    let url = URL_SERVICE + '/usuarios';

    return this.http.post( url, usuario ).pipe(
      map( (resp:any) => {
        swal('Usuario creado', usuario.email, 'success');
        return resp.usuario;
    }));
  }

  guardarStorage( id: string, token: string, usuario: Usuario){

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  logout(){
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login'])
  }

  loginGoogle( token:string){

    let url = URL_SERVICE + '/login/google';

    return this.http.post( url, { token: token})
      .pipe(map( (resp:any)=> {
        this.guardarStorage(resp.id, resp.token, resp.usuario);

        return true;
      }));
  }

  login( usuario: Usuario, recordar: boolean){
    
    let url = URL_SERVICE + '/login';

    if(recordar){
      localStorage.setItem('email', usuario.email);
    }else{
      localStorage.removeItem('email');
    }

    return this.http.post( url, usuario)
    .pipe(map( (resp: any )=> {
      
      this.guardarStorage(resp.id, resp.token, resp.usuario);

      return true;
    }));
  }
}
