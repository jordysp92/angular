import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[];
  total:number=0;

  constructor(
    public hospitalService: HospitalService,
    public modalUploadService: ModalUploadService
  ) { 
  }

  ngOnInit(): void {
    this.cargarHospitales();

    this.modalUploadService.notificacion.subscribe(()=>{
        this.cargarHospitales();
      }
    );
  }
  
  cargarHospitales(){
    
    this.hospitalService.cargarHospitales()
      .subscribe( (hospitales: Hospital[]) =>{
        this.hospitales = hospitales;
        this.total = this.hospitalService.totalHospitales;
      });
  }

  buscarHospital( termino: string){
    if(termino.length <= 0 ){
      this.cargarHospitales();
      return;
    }

    this.hospitalService.buscarHospital( termino)
      .subscribe( hospitales =>{
        this.hospitales = hospitales;
      })
  }

  guardarHospital(  hospital: Hospital){
    this.hospitalService.actualizarHospital( hospital)
      .subscribe();
  }

  borrarHospital( hospital: Hospital){
    this.hospitalService.borrarHospital( hospital._id)
      .subscribe( () => { 
        this.cargarHospitales(); 
      });
  }

  crearHospital(){

    Swal
    .fire({
        title: "Crear hospital",
        input: "text",
        showCancelButton: true,
        confirmButtonText: "Crear",
        cancelButtonText: "Cancelar",
    })
    .then(resultado => {
        if (resultado.value) {
            let nombre = resultado.value;
            this.hospitalService.crearHospital(<string>nombre)
              .subscribe( hospital =>{
                this.hospitales.push(hospital);
                this.hospitalService.totalHospitales = this.hospitales.length;
                this.total = this.hospitales.length;
                //this.cargarHospitales();
              });
           
        }
    });
  }

  actualizarImagen(hospital:Hospital){
    this.modalUploadService.mostrarModal( 'hospitales', hospital._id)
  }

}
