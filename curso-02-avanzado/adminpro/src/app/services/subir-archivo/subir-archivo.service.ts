import { Injectable } from '@angular/core';
import { URL_SERVICE } from '../../config/config';

@Injectable()
export class SubirArchivoService {

  constructor() { }

  subirArchivo( archivo: File, tipo: string, id: string){

    return new Promise( (resolve, reject) =>{

      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      formData.append( 'imagen', archivo, archivo.name);

      xhr.onreadystatechange = ()=>{

        if(xhr.readyState === 4){
          if(xhr.status === 200){
            resolve( JSON.parse(xhr.response));
          }else{
            reject( JSON.parse(xhr.response));
          }
        }
      };

      let url = URL_SERVICE + '/upload/' + tipo +'/'+ id;

      xhr.open( 'PUT', url, true);
      xhr.send(formData);
      
    });


  }
}
