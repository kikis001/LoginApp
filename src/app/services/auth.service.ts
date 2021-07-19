import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private url = "https://identitytoolkit.googleapis.com/v1/accounts"
  // Clave de la API web 
  private apikey = "AIzaSyBb-AEAa6ERaiNpkDd-dy9pPzjep7sn4vk"
  // crear usuarios
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
  // Login
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
  
  constructor(private http:HttpClient) { }
  userToken:string
  
  logout(){

  }

  login( usuario:UsuarioModel){
    const authData = {
      ...usuario,
      returnSecureToken : true
    }
    // log In
    return this.http.post(`${this.url}:signInWithPassword?key=${this.apikey}`,
     authData).pipe(
       map(resp => {
         this.guardanToken(resp['idToken'])
         return resp
       })
     )
  }

  nuevoUsuario( usuario:UsuarioModel){
    const authData = {
      ...usuario,
      // email: usuario.email,
      // password: usuario.password
      returnSecureToken : true
    }    
    // Register
    return this.http.post(
      `${this.url}:signUp?key=${this.apikey}`,
       authData).pipe(
         map(resp => {
           this.guardanToken(resp['idToken'])
           return resp
         })
       )
  }

  private guardanToken( idToken: string){
    this.userToken = idToken
    localStorage.setItem('token', idToken)
  }

  leerToken(){
    if(localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    }else{
      this.userToken = ''
    }
    return this.userToken
  }

}
