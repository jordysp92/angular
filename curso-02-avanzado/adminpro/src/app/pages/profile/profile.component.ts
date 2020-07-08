import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;

  constructor( public usuarioService: UsuarioService) {
    this.usuario = this.usuarioService.usuario;
   }

  ngOnInit(): void {
  }

  guardar( usuario: Usuario){
    
    this.usuario.nombre = usuario.nombre;

    if(!this.usuario.google){
      this.usuario.email = usuario.email;

    }

    this.usuarioService.actualizarUsuario(this.usuario)
      .subscribe( resp => {
        
    })

  }

  seleccionarImagen( archivo: File){
    if(!archivo){
      this.imagenSubir = null;
      return;
    }

    if(archivo.type.indexOf('image')<0){
      Swal.fire('Solo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();

    let urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => this.imagenTemp = reader.result.toString();

  }

  cambiarImagen(){
    this.usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id);
  }

}
