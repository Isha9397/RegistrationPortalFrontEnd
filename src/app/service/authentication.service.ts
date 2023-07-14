import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  getToken() {
    return localStorage.getItem('jwtToken');
  }

  isUserLoggedIn() {
    //let user = sessionStorage.getItem('jwtToken')
    let user = localStorage.getItem('jwtToken')
    console.log(user)
    console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
     //sessionStorage.removeItem('username')
     localStorage.removeItem('jwtToken')
  }
}
