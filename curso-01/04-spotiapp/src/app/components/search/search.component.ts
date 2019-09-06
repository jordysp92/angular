import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent {

  artistas: any[] = [];
  loading: boolean;

  constructor( private spotify: SpotifyService) { }

  buscarArtista(termino: string){
    this.loading = true;
    console.log(termino);
    if(termino.length>0){
      this.spotify.getArtistas(termino)
        .subscribe((data: any) => {
          console.log(data);
          this.artistas = data;
          this.loading = false;  
        })

    }else{
      this.loading = false;  
      this.artistas = [];
    }

 }

}
