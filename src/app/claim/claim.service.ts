import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Claim } from './claim';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {

  constructor(private http:HttpClient) { }

  // private apiPost:string =`http://localhost:8081/api/member/submitClaims`;
  private apiPost:string =`http://ec2-54-202-237-5.us-west-2.compute.amazonaws.com:8084/api/member/submitClaims`;

  // private getClaimByMemberId:string =`http://localhost:8081/api/member/GetClaimByMemberId`;
  private getClaimByMemberId:string =`http://ec2-54-202-237-5.us-west-2.compute.amazonaws.com:8084/api/member/GetClaimByMemberId`;

  addUser(claimOb:Claim): Observable<Claim>
  {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin' , '*');
    return this.http.post<Claim>(this.apiPost,claimOb,{headers});
  }

  getClaimForMember(bid:number):Observable<Array<Claim>>
  {
    let addHeader = new HttpHeaders()
    addHeader=addHeader.set('content-type','application/json')
    addHeader=addHeader.set('Access-Control-Allow-Origin', '*');
    console.log(addHeader);
    return this.http.get<Array<Claim>>(`${this.getClaimByMemberId}`);
  }
}
