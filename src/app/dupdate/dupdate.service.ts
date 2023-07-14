import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dupdate } from './dupdate';

@Injectable({
  providedIn: 'root'
})
export class DupdateService {

  constructor(private http:HttpClient) {}

  private apiUpdate:string =`http://localhost:8081/api/dependent/updateDependentDetails`;

  // private apiUpdateForMember ='http://localhost:8081/api/dependent/updateDependentForMemberId';
  private apiUpdateForMember ='http://ec2-54-202-237-5.us-west-2.compute.amazonaws.com:8084/api/dependent/updateDependentForMemberId';

  // private apiGetDependentForMember:string =`http://localhost:8081/api/dependent/getDependentsForMemberId`;
  private apiGetDependentForMember:string =`http://ec2-54-202-237-5.us-west-2.compute.amazonaws.com:8084/api/dependent/getDependentsForMemberId`;

  updateDependentDetails(dupdateObj:Dupdate):Observable<Dupdate>
  {
   const token: any = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + token });
    headers.append('Access-Control-Allow-Origin' , '*');
    return this.http.put<Dupdate>(this.apiUpdate,dupdateObj,{headers});
  }

  updateDependentForMemberId(dupdateObj:Dupdate):Observable<Dupdate>
  {
   const token: any = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + token });
    headers.append('Access-Control-Allow-Origin' , '*');
    //return this.http.put<Dupdate>(this.apiUpdateForMember,dupdateObj,{headers});
    return this.http.put<Dupdate>(`${this.apiUpdateForMember}`, dupdateObj,{headers});
  }

  getDependentsForMember():Observable<Array<Dupdate>>
  {
    let addHeader = new HttpHeaders()
    addHeader=addHeader.set('content-type','application/json')
    addHeader=addHeader.set('Access-Control-Allow-Origin', '*');
    console.log(addHeader);
    return this.http.get<Array<Dupdate>>(`${this.apiGetDependentForMember}`);
  }
}
