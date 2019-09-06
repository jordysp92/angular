import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class SpotifyService {
  constructor(private http: HttpClient) {
    console.log("Spotify Service created");
  }


  getQuery( query: string){
    const url = `https://api.spotify.com/v1/${ query }`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQDIGe77zjpk0vRyGJDHf5cWfJ8nwx9V2mLz_IUBtlPhwbG4pntMFT1dlcYPFVllNbaYqmi8qeC-En5RQc0'
    })

    return this.http.get(url, { headers });
  }

  getNewRealeases() {

    return this.getQuery('browse/new-releases')
      .pipe( map( data => {
        return data['albums'].items;
    }))
      
  }

  getArtistas(termino: string){
   

    return this.getQuery(`search?q=${termino}&type=artist`)
      .pipe( map( data => {
        return data['artists'].items;
      }))
  }

  getArtista(idArtista: string){
    return this.getQuery(`artists/${idArtista}`);
    
    /*.pipe( map( data => {
      return data['artists'].items;
    }))*/
  }

  getTopTracks(idArtista: string){
    return this.getQuery(`artists/${idArtista}/top-tracks?country=us`)
    .pipe( map( data => {
      return data['tracks'];
    }));
  
  }

}
