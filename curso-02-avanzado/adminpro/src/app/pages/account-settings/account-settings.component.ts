import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  constructor(public settingsService: SettingsService) { }

  ngOnInit(): void {
    this.colocarCheck();
  }

  cambiarColor(tema: string, link: ElementRef) {

    //Aplico estilo seleccionado
    this.aplicarCheck(link);

    this.settingsService.aplicarTema(tema);


  }

  aplicarCheck(link: any) {
    let selectores: any = document.getElementsByClassName('selector');

    //borro el check anterior
    for (let ref of selectores) {
      ref.classList.remove('working');
    }
    //Agrego el check seleccionado
    link.classList.add('working');
  }

  colocarCheck() {
    let selectores: any = document.getElementsByClassName('selector');

    let tema = this.settingsService.ajustes.tema;

    for (let ref of selectores) {
      if( ref.getAttribute('data-theme') === tema){
        //Agrego el check seleccionado
        ref.classList.add('working');
        break;
      }

    }
  }
}
