import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';

  private apiKey = 'AIzaSyAIZ17Hxe1f8SmLQTEwBt4eA-xNb6JbCF4';

  userToken: string;

  //crear usuarios
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  //login
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor( private http: HttpClient) {
    this.leerToken();
   }

  logout(){
    localStorage.removeItem('token');
  }

  login( usuario: UsuarioModel){
    const authData = {
      ...usuario,
      returnSecureToken: true
    };
    return this.http.post(
      this.url + 'signInWithPassword?key='+this.apiKey, authData
    ).pipe(
      map( resp =>{
        this.guardarToken( resp['idToken'], resp['expiresIn']);
        return resp;
      })
    );
  }

  nuevoUsuario( usuario: UsuarioModel){

    /*
    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    }
    */
   const authData = {
    ...usuario,
    returnSecureToken: true
    };

    return this.http.post(
      this.url + 'signUp?key='+this.apiKey, authData
    ).pipe(
      map( resp =>{
        this.guardarToken( resp['idToken'], resp['expiresIn']);
        return resp;
      })
    );
  }

  private guardarToken( idToken: string, expiresIn: string){
    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds(parseInt(expiresIn));

    localStorage.setItem('expira', hoy.getTime().toString());
  }

  leerToken(){
    if(localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    }else{
      this.userToken = ''
    }

    return this.userToken;
  }

  estaAutenticado(): boolean {

    if( this.userToken.length < 2){
      return false;
    }
    let expira = Number(localStorage.getItem('expira'));

    const expiraFecha = new Date();
    expiraFecha.setTime(expira); 

    if(expiraFecha > new Date()){
      return true;
    }
    return false;

  }
}
