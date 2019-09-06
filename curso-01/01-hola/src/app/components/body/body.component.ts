import {Component} from '@angular/core'

@Component({
    selector: 'app-body',
    templateUrl: './body.component.html'
})
export class BodyComponent{
    mostrar = true;
    frase: any = {
        mensaje: 'Viajando por el mundo',
        autor: 'Jordy'
    };

    personajes: string[] = ['Galactus', 'Thanos', 'Apocalipsis'];
}