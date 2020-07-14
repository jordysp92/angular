import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICE } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Hospital } from '../../models/hospital.model';

@Injectable()
export class HospitalService {

  totalHospitales: number=0;

  constructor(
    public http: HttpClient, 
    public router: Router,
    public usuarioService: UsuarioService
  ) { }

  cargarHospitales(){

    let url = URL_SERVICE + '/hospital';

    return this.http.get(url)
            .pipe(map( (resp:any)=>{
              this.totalHospitales = resp.total;
              return resp.hospitales;
            }));

  }

  obtenerHospital(id:string){

    let url = URL_SERVICE + '/hospital/' + id;

    return this.http.get(url)
            .pipe(map( (resp:any)=>{
              return resp.hospital;
            }));

  }

  borrarHospital( id: string){
    let url = URL_SERVICE + '/hospital/' + id;
    url += '?token='+ this.usuarioService.token;

    return this.http.delete(url)
            .pipe(map( (resp:any)=>{

              Swal.fire( 'Hospital borrado', 'Se elimino correctamente', 'success');

            }));
  }

  crearHospital( nombre: string){

    let url = URL_SERVICE + '/hospital';
    url += '?token=' + this.usuarioService.token;

    return this.http.post(url, { nombre: nombre })
            .pipe(map( (resp:any)=>{
              return resp.hospital;
            }));

  }

  buscarHospital( termino: string ){
    let url = URL_SERVICE +'/busqueda/coleccion/hospitales/' + termino;

    return this.http.get( url )
              .pipe(map( (resp:any)=>{
                return resp.hospitales;
              }));
  }

  actualizarHospital( hospital: Hospital){
    let url = URL_SERVICE + '/hospital/'+ hospital._id;
    url += '?token='+ this.usuarioService.token;

    return this.http.put(url, hospital)
            .pipe(map( (resp:any)=>{
              Swal.fire('Hospital actualizado', hospital.nombre, 'success');
              return resp.hospital;
            }))
  }
}
