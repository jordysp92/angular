import { Component, OnInit } from '@angular/core';
import { HeroesService, Heroe} from '../../service/heroes.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Heroe[] = [];

  /* Import HeroesService */
  constructor( private _heroesService: HeroesService,
               private router: Router) { 
  }

  ngOnInit() {
    this.heroes = this._heroesService.getHeroes();
  }
  
  /* Funciones de component*/
  verHeroe(idx: number){
    this.router.navigate(['/heroe', idx])
  }

}
