import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  nombre = 'Jordy';
  nombre2 = 'jordy giLberto De La Fuente'
  arreglo = [1,2,3,4,5,6,7,8];
  video = "tgbNymZ7vqY";

  PI = Math.PI;

  a = 0.2345;

  salario =1234.5;
  heroe = {
    nombre: 'Barry',
    clave: 'Flash',
    edad: 26,
    direcion:{
      calle: 'moreno',
      numero: 785
    }
  };

  valorDePromesa = new Promise(( resolve, reject) => {
    setTimeout(()=> resolve('Data returnada'), 3500)
  });

  fecha = new Date();
}
