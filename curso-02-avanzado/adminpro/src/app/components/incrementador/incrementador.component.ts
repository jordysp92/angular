import { Component, OnInit, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgreso') txtProgreso: ElementRef;

  @Input('nombre') leyenda: string = 'Descripcion';

  @Input() progreso: number = 50;

  @Output('actualizaProgreso') cambioProgreso: EventEmitter<number> = new EventEmitter();

  constructor() {

  }

  ngOnInit(): void {
  }

  onChange(newValue: number){
    
    if ( newValue >= 100){
      this.progreso = 100;
    }else if ( newValue <= 0 ){
      this.progreso = 0;
    }else{
      this.progreso = newValue;
    }

    //Esto impide que no se pueda escribir en el input mas de 100.
    //Si escribe 200, en el input solo mostrara el valor maximo 100
    this.txtProgreso.nativeElement.value = this.progreso;

    this.cambioProgreso.emit(this.progreso);
  }

  cambiarValor( valor: number ){
    if ( (this.progreso >= 100 && valor > 0) 
          || (this.progreso <= 0 && valor < 0 ) ) {
      return;
    }
    this.progreso = this.progreso + valor;
    this.cambioProgreso.emit(this.progreso);

    this.txtProgreso.nativeElement.focus();
  }

}
