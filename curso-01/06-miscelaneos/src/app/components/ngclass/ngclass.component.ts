import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ngclass',
  templateUrl: './ngclass.component.html',
  styles: []
})
export class NgclassComponent implements OnInit {

  alerta: string = 'alert-danger';

  loading: boolean = false;

  propiedades:Object = {
    danger: false 
  }

  constructor() { }

  ngOnInit() {
  }

  ejecutar(){
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }

}
