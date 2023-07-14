import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dependent } from './dependent';

@Injectable({
  providedIn: 'root'
})
export class DependentService {

  constructor(private http: HttpClient) { }

  // private apiPostDependent:string =`http://localhost:8081/api/dependent/addDependent`;
  private apiPostDependent:string =`http://ec2-54-202-237-5.us-west-2.compute.amazonaws.com:8084/api/dependent/addDependent`;
  
  // private apiGetDependentForMember:string =`http://localhost:8081/api/dependent/getDependentsForMemberId`;
  private apiGetDependentForMember:string =`http://ec2-54-202-237-5.us-west-2.compute.amazonaws.com:8084/api/dependent/getDependentsForMemberId`;

  // private apiUpdate: string ='http://localhost:8081/api/dependent/updateDependentDetails';
  private apiUpdate: string ='http://ec2-54-202-237-5.us-west-2.compute.amazonaws.com:8084/api/dependent/updateDependentForMemberId';

  
  addDependent(dependent:Dependent):Observable<Dependent>
  {
    const token: any = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + token });
    console.log(headers);
    
    headers.append('Access-Control-Allow-Origin' , '*');
    return this.http.post<Dependent>(`${this.apiPostDependent}`, dependent,{headers});
  }

  // getDependentsForMember(bid:number):Observable<Array<Dependent>>
  getDependentsForMember():Observable<Array<Dependent>>
  {
    let addHeader = new HttpHeaders()
    addHeader=addHeader.set('content-type','application/json')
    addHeader=addHeader.set('Access-Control-Allow-Origin', '*');
    console.log(addHeader);
    return this.http.get<Array<Dependent>>(`${this.apiGetDependentForMember}`);
  }

  updateDependentDetails(dependent:Dependent):Observable<Dependent>
  {
   const token: any = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + token });
    headers.append('Access-Control-Allow-Origin' , '*');
    return this.http.put<Dependent>(this.apiUpdate,dependent,{headers});
  }
}
