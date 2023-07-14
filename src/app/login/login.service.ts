import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from './login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  //private apiPost:string =`http://localhost:8081/auth/user/login`;
  private apiPost:string =`http://ec2-54-202-237-5.us-west-2.compute.amazonaws.com:8084/auth/user/login`;

  postLogin(loginObj:Login){
    // let url = `http://localhost:8080/login`;
    console.log(loginObj);
    
    return this.http.post<Login>(this.apiPost,loginObj);
  }
}
