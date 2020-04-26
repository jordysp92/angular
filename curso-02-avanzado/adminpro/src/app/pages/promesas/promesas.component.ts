import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() {
    
    let promesa = this.contar();

    promesa.then(
      (data) => console.log("Se termino: ",data)
    ).catch( error => {
      console.error("Error en la promesa: ", error)
    });

  }

  ngOnInit(): void {
  }

  contar() {
    let promesa = new Promise( (resolve, reject)=>{
      
      let contador = 0;

      let intervalo = setInterval( () => {
          contador += 1;
          console.log(contador);
          if( contador === 3){
            resolve(true);
            clearInterval(intervalo);
          }
      }, 1000);

    });

    return promesa;
  }
}
