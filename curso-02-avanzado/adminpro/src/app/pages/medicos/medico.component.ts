import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { MedicoService, HospitalService } from '../../services/service.index';
import { Medico } from 'src/app/models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[]= [];
  medico: Medico = new Medico('','','','','');
  hospital: Hospital = new Hospital('');

  constructor(
    public medicoService: MedicoService,
    public hospitalService: HospitalService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public modalUploadService: ModalUploadService
  ) { 
    this.activatedRoute.params.subscribe( params =>{
      let id = params['id'];

      if( id !== 'nuevo'){
        this.cargarMedico(id);
      }
    })
  }

  ngOnInit(): void {
    this.hospitalService.cargarHospitales()
      .subscribe( hospitales =>{
        this.hospitales = hospitales;
      })

      this.modalUploadService.notificacion.subscribe(resp=>{
        this.medico.img = resp.medico.img;
      }
    );
  }

  guardarMedico(forma: NgForm){
    
    if(forma.valid){
      this.medicoService.guardarMedico(this.medico)
        .subscribe((medico: Medico )=>{
          this.medico._id = medico._id;
          this.router.navigate(['/medico', medico._id]);
        })
    }
  }

  cambioHospital(id:string){
    this.hospitalService.obtenerHospital(id)
      .subscribe( (hospital:Hospital) => {
        this.hospital = hospital;
      })
  }

  cargarMedico( id:string){
    this.medicoService.cargarMedico(id)
      .subscribe( medico =>{
        this.medico = medico;
        this.medico.hospital = medico.hospital._id;
        this.cambioHospital(this.medico.hospital)
      })
  }

  cambiarFoto(){
    this.modalUploadService.mostrarModal( 'medicos', this.medico._id)

  }
}
