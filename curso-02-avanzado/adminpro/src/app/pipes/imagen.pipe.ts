import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICE } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: any, tipo: any = 'usuario'): any {

    let url = URL_SERVICE + '/img';

    //sin image: noimage
    if(!img){
      return url + '/usuarios/noimage';
    }

    //Imagen por google
    if(img.indexOf('https')>=0){
      return img;  
    }

    switch(tipo){
      case 'usuario':
        url += '/usuarios/' + img;
      break;
      
      case 'medico':
        url += '/medicos/' + img;

      break;

      case 'hospital':
        url += '/hospital/' + img;

      break;

      default:
        url += '/usuarios/noimage'
    }


    return url;
  }

}
