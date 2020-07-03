import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean=false;
  auth2: any;

  constructor( public router: Router,
    public usuarioService: UsuarioService) { }

  ngOnInit(): void {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';

    if(this.email.length>0){
      this.recuerdame = true;
    }
  }

  googleInit(){
    gapi.load('auth2', ()=>{
      this.auth2 = gapi.auth2.init({
        client_id: '984867875979-ruf3cbnqp63cis9s5kgs680lkpchv4st.apps.googleusercontent.com',
        cookipoilicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignIn( document.getElementById('btnGoogle'));
    });
  }

  attachSignIn(element){
    this.auth2.attachClickHandler( element, {}, (googleUser) =>{

      //let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;

      this.usuarioService.loginGoogle(token)
        .subscribe( () =>{
          //this.router.navigate(['/dashboard']);
          window.location.href = '#/dashboard';
        });

    })
  }

  ingresar( forma: NgForm){
  
    if(forma.valid){
      let usuario =  new Usuario(null, forma.value.email, forma.value.password);

      this.usuarioService.login( usuario, forma.value.recuerdame )
        .subscribe( ()=>{
          this.router.navigate(['/dashboard']);
          
        })
    }

  }
}
