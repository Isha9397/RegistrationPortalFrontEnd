import { Injectable } from '@angular/core';
import { Registration } from './registration';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http:HttpClient) { }

  // private apiPost:string =`http://localhost:8081/auth/user/registerUser`;
  private apiPost:string =`http://ec2-54-202-237-5.us-west-2.compute.amazonaws.com:8084/auth/user/registerUser`;

  addUser(registerOb:Registration): Observable<Registration>
  {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin' , '*');
    return this.http.post<Registration>(this.apiPost,registerOb,{headers});
  }
}
