import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:UsuarioModel = new UsuarioModel()
  recordarme = false
  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit() {
    if(localStorage.getItem('email') && localStorage.getItem('pass')){
      this.usuario.email = localStorage.getItem('email')
      this.usuario.password = localStorage.getItem('pass')
      this.recordarme = true
    }
  }

  login( form:NgForm ){
    if(form.invalid){ 
      return
     }

     this.auth.login( this.usuario)
     .subscribe( resp => {
      if(this.recordarme){
        localStorage.setItem('email', this.usuario.email )
        localStorage.setItem('pass', this.usuario.password)
      }
       this.router.navigateByUrl('/home')
       console.log(resp)
     }, err => {
       console.log(err.error.error.message)
     })
  }

}
