import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import {HttpClient} from '@angular/common/http';
import { URL_SERVICE } from '../../config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';



@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor( public http: HttpClient, public router: Router,
    public subirArchivoService: SubirArchivoService ) { 
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
        Swal.fire('Usuario creado', usuario.email, 'success');
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

  actualizarUsuario( usuario: Usuario){
    
    let url = URL_SERVICE + '/usuarios/' + usuario._id;

    url += '?token='+ this.token;

    return this.http.put( url, usuario)
      .pipe(map( (resp:any)=>{

        if(usuario._id === this.usuario._id){
          let usuarioDB = resp.usuario;
          this.guardarStorage(usuarioDB._id, this.token, usuarioDB);
        }

        Swal.fire('Usuario actualizado', usuario.nombre, 'success');
        return true;

      }));
  }

  cambiarImagen( archivo: File, id: string){
    this.subirArchivoService.subirArchivo( archivo, 'usuarios', id )
      .then( (resp:any) =>{
        this.usuario.img = resp.usuario.img;
        
        Swal.fire('Imagen actualizada', this.usuario.nombre, 'success');
        this.guardarStorage( id, this.token, this.usuario);
      }).catch( error =>{
        console.log(error);
      });
  }

  cargarUsuarios( desde:number=0){

    let url = URL_SERVICE + '/usuarios?desde='+desde;

    return this.http.get(url);

  }

  buscarUsuarios( termino: string ){
    let url = URL_SERVICE +'/busqueda/coleccion/usuarios/' + termino;

    return this.http.get( url )
              .pipe(map( (resp:any)=>{
                return resp.usuarios;
              }));
  }

  borrarUsuario( id: string){
    let url = URL_SERVICE + '/usuarios/' + id + '?token=' + this.token;

    return this.http.delete(url)
            .pipe(map( resp =>{
              Swal.fire('Usuario borrado', 'El usuario ha sido eliminado', 'success');
              return true;
            }));
  }
}
