import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  suscripcion: Subscription;

  constructor() {

    

    this.suscripcion = this.getObservable()
    .subscribe( data => {
      console.log('Subs: ', data);
    }, error => {
      console.error("Error subs: ", error);
    }, ()=>{
      console.log("Se termino observador");
    })

   }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.suscripcion.unsubscribe()
  }

  getObservable(): Observable<any>{
    let obs = new Observable( (observer: Subscriber<any>) =>{

      let contador = 0;
      let intervalo = setInterval(()=>{

        contador +=1;

        const salida = {
          valor: contador
        };
        
        observer.next( salida);

        /* if( contador === 3 ){
          clearInterval(intervalo);
          observer.complete();
        } */
        /* if( contador ===2){
          //clearInterval(intervalo);
          observer.error('Error al contar');
        } */

      }, 1000);

    });

    return obs.pipe( 
      map( resp =>{
        return resp.valor;
      }),
      filter( (data, index) => {
        //devuelve solo impares
        if(data%2 == 0){
          return false;
        }else{
          return true;
        }
      })
      
    );
  }
}
