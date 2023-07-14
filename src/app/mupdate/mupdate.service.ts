import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mupdate } from './mupdate';

@Injectable({
  providedIn: 'root'
})
export class MupdateService {

  constructor(private http:HttpClient) {}

  // private apiUpdate:string =`http://localhost:8081/api/user/updateMemberDetails`;
  private apiUpdate:string =`http://ec2-54-202-237-5.us-west-2.compute.amazonaws.com:8084/api/user/updateMemberDetails`;

  // private apiGetById:string =`http://localhost:8081/api/user/getMemberById`;
  private apiGetById:string =`http://ec2-54-202-237-5.us-west-2.compute.amazonaws.com:8084/api/user/getMemberById`;


  updateMemberDetails(mupdateObj:Mupdate):Observable<Mupdate>
  {
   const token: any = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + token });
    headers.append('Access-Control-Allow-Origin' , '*');
    return this.http.put<Mupdate>(this.apiUpdate,mupdateObj,{headers});
  }

  // getMemberById(bid:number):Observable<Mupdate> //Observable<Array<Book>> //Observable<Book>
  // {
  //   //return this.http.get<Array<Book>>(`${this.apiGetById}/${bid}`);
  //   const token: any = localStorage.getItem('jwtToken');
  //   const headers = new HttpHeaders({ Authorization: 'Bearer ' + token });
  //   console.log(headers);
  //   headers.append('Access-Control-Allow-Origin' , '*');
  //   return this.http.get<Mupdate>(`${this.apiGetById}/${bid}`,{headers});
  // }
  getMemberById():Observable<Mupdate> //Observable<Array<Book>> //Observable<Book>
  {
    //return this.http.get<Array<Book>>(`${this.apiGetById}/${bid}`);
    const token: any = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + token });
    console.log(headers);
    
    headers.append('Access-Control-Allow-Origin' , '*');
    return this.http.get<Mupdate>(`${this.apiGetById}`,{headers});
  }
  
}
