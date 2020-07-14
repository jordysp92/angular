import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICE } from '../../config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from '../../models/medico.model';

@Injectable()
export class MedicoService {

  totalMedicos:number;

  constructor(
    public http: HttpClient,
    public usuarioService: UsuarioService
  ) { }

  cargarMedicos(){
    let url = URL_SERVICE + '/medico';

    return this.http.get(url)
            .pipe(map((resp:any)=>{
              this.totalMedicos = resp.total;
              return resp.medicos;
            }));
  }

  buscarMedicos( termino: string ){
    let url = URL_SERVICE +'/busqueda/coleccion/medicos/' + termino;

    return this.http.get( url )
              .pipe(map( (resp:any)=>{
                return resp.medicos;
              }));
  }

  borrarMedico( id:string){
    let url = URL_SERVICE + '/medico/'+id;
    url += '?token='+ this.usuarioService.token;
    return this.http.delete(url)
            .pipe(map( (resp:any)=>{

              Swal.fire( 'Medico borrado', 'Se elimino correctamente', 'success');

            }));
  }

  guardarMedico(medico:Medico){
    let url = URL_SERVICE + '/medico';

    
    if(medico._id){
      //actualizando
      url += '/'+medico._id;
      url+= '?token=' +this.usuarioService.token;

      return this.http.put(url, medico)
              .pipe(map( (resp:any)=>{
                Swal.fire('Medico actualizado', medico.nombre, 'success');
                return resp.medico;
              }))
    }else{
      //creando
      url+= '?token=' +this.usuarioService.token;
      return this.http.post(url, medico)
        .pipe(map( (resp:any)=>{
          Swal.fire('Médico creado', medico.nombre, 'success');
          return resp.medico;
        }))
    }


  }

  cargarMedico(id:string){

    let url = URL_SERVICE + '/medico/' +id;

    return this.http.get(url)
            .pipe(map( (resp:any) =>{
              return resp.medico;
            }))

  }
}
