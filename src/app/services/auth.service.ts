import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';

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

  logout(){

  }

  login( usuario:UsuarioModel){
    const authData = {
      ...usuario,
      returnSecureToken : true
    }
    return this.http.post(`${this.url}:signInWithPassword?key=${this.apikey}`, authData)
  }

  nuevoUsuario( usuario:UsuarioModel){
    const authData = {
      ...usuario,
      // email: usuario.email,
      // password: usuario.password
      returnSecureToken : true
    }
    return this.http.post(
      `${this.url}:signUp?key=${this.apikey}`
      , authData )
  }


}
