import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';
import swal from 'sweetalert';


declare function init_plugins();


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(
    public usuarioService: UsuarioService,
    public router: Router
    ) { }

  ngOnInit(): void {
    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      email: new FormControl( null, [Validators.required, Validators.email]),
      password: new FormControl( null, Validators.required),
      password2: new FormControl( null, Validators.required),
      condiciones: new FormControl( false )
    }, { validators: this.sonIguales('password', 'password2')});

    this.forma.setValue({
      nombre: 'test',
      email: 'test@gmail.com',
      password: 'qwe',
      password2: 'qwe',
      condiciones: true
    })
  }

  sonIguales(cmp1: string, cmp2:string){
    return ( group: FormGroup) =>{

      let pass1 = group.controls[cmp1].value;
      let pass2 = group.controls[cmp2].value;

      if(pass1 === pass2){
        return null;
      }

      return {
        sonIguales: true
      }
    }
  }

  registrarUsuario(){

    if(this.forma.invalid){
      return;
    }
    if(!this.forma.value.condiciones){
      swal('Importante', 'Debe de aceptar las condiciones', 'warning')
      return;
    }

    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.email,
      this.forma.value.password
    );

    this.usuarioService.crearUsuario(usuario)
      .subscribe( resp =>{
        
        this.router.navigate(['/login']);

      }, err =>{
        console.log(err);
      } );


  }
}
