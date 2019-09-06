import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HeroesService, Heroe } from "../../service/heroes.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-busqueda-heroe",
  templateUrl: "./busqueda-heroe.component.html"
})
export class BusquedaHeroeComponent implements OnInit {
  heroes: Heroe[] = [];
  termino: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _heroesService: HeroesService,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe(params => {
      console.log("estoy aca")
      this.heroes = this._heroesService.buscarHeroes(params["termino"]);
      this.termino = params['termino'];
      console.log(this.heroes);
    });
  }

  ngOnInit() {}
  /* Funciones de component*/
  verHeroe() {
    //   console.log("Index: " + idx);
    // this.router.navigate(["/heroe", idx]);
  }
}
