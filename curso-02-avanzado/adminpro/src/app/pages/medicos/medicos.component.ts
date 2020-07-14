import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {

  medicos:Medico[]=[];
  total:number=0;

  constructor(
    public medicoService:MedicoService
  ) { }

  ngOnInit(): void {
    this.cargarMedicos();
  }

  cargarMedicos(){

    this.medicoService.cargarMedicos()
      .subscribe( medicos=>{
          this.total = this.medicoService.totalMedicos;
          this.medicos = medicos;
        }
      )
  }

  buscarMedico(termino:string){

    if(termino.length<=0){
      this.cargarMedicos();
      return;
    }

    this.medicoService.buscarMedicos(termino)
      .subscribe( medicos =>{
        this.medicos = medicos;
      })
  }

  borrarMedico(medico: Medico){
    this.medicoService.borrarMedico(medico._id)
      .subscribe(() => { 
        this.cargarMedicos();
      })
  }
}
