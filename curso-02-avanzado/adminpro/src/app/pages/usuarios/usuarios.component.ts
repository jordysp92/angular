import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[]=[];

  desde: number = 0;
  totalRegistros: number = 0;

  cargando: boolean = true;

  constructor( 
    public usuarioService: UsuarioService,
    public modaUploadService: ModalUploadService) { }

  ngOnInit(): void {
    this.cargarUsuarios();

    this.modaUploadService.notificacion
      .subscribe( resp=>{
        this.cargarUsuarios();
      })
  }

  cargarUsuarios(){

    this.cargando = true;

    this.usuarioService.cargarUsuarios(this.desde)
      .subscribe( (resp:any) =>{
        this.cargando = false;
        this.totalRegistros = resp.total;
        this.usuarios = resp.usuarios;

      })
  }

  cambiarDesde( valor:number){
    let desde = this.desde + valor;

    if( desde >= this.totalRegistros ){
      return ;
    }

    if( desde<0){
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario( termino: string){

    if(termino.length <= 0 ){
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;
    this.usuarioService.buscarUsuarios(termino)
      .subscribe( (usuarios: Usuario[])=>{
        this.cargando = false;
        this.usuarios = usuarios;
      })
  }

  borrarUsuario( usuario: Usuario ){
    if( usuario._id === this.usuarioService.usuario._id){
      Swal.fire('No puede borrar usuario', 'No se puede borrar el mismo usuario logueado', 'error');
      return;
    }

    Swal.fire({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.value) {

        this.usuarioService.borrarUsuario(usuario._id)
          .subscribe( (resp:any)=>{
            this.cargarUsuarios();
          })

      }
    })

  }

  guardarUsuario( usuario: Usuario ){
    this.usuarioService.actualizarUsuario(usuario)
      .subscribe( resp => {
        
    });
  }

  mostrarModal( id: string){
    this.modaUploadService.mostrarModal( 'usuarios', id);
  }

}
