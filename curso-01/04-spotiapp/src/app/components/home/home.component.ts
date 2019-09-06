import { Component } from "@angular/core";
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styles: []
})
export class HomeComponent{

  nuevasCanciones: any[] = [];
  loading: boolean;
  error: boolean;
  mensajeError: string = "";

  constructor( private spotify: SpotifyService) {
    this.error = false;
    this.loading = true;

    this.spotify.getNewRealeases().subscribe(( data: any ) => {
      this.nuevasCanciones = data;
      this.loading = false;
    }, (errorServicio)=>{
      this.loading = false;

      this.error = true;
      console.log(errorServicio.error.error.message)
      this.mensajeError = errorServicio.error.error.message
    });

  }

  
}
