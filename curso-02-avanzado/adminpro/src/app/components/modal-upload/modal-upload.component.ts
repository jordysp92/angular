import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: [
  ]
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;

  constructor(
    public subirArchivoService: SubirArchivoService,
    public modalUploadService: ModalUploadService
  ) { }

  ngOnInit(): void {
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

  cerrarModal(){
    this.imagenTemp= null;
    this.imagenSubir = null;
    this.modalUploadService.ocultarModal();
  }

  subirImagen(){
    this.subirArchivoService.subirArchivo(this.imagenSubir, this.modalUploadService.tipo, this.modalUploadService.id)
      .then( resp=>{
        this.modalUploadService.notificacion.emit(resp);
        this.cerrarModal();
      }).catch( err =>{

      })
  }
}
