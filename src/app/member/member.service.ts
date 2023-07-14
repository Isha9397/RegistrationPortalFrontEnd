import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from './member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http:HttpClient)
  { }

  member: Member[] |any;

 private apiGet:string =`http://localhost:8081/api/user/getAllUsers`;
 
//  private apiUpdate:string =`http://localhost:8081/api/user/updateMemberDetails`;
private apiUpdate:string =`http://ec2-54-202-237-5.us-west-2.compute.amazonaws.com:8084/api/user/updateMemberDetails`;
 
//  private apiGetById:string =`http://localhost:8081/api/user/getMemberById`;
private apiGetById:string =`http://ec2-54-202-237-5.us-west-2.compute.amazonaws.com:8084/api/user/getMemberById`;

 //private apigetByMemberName:string =`http://localhost:8081/api/user/getByMemberName`;
 private apigetByMemberName:string ='http://ec2-54-202-237-5.us-west-2.compute.amazonaws.com:8084/api/user/getByMemberName';

  getAll():Observable<Array<Member>>
  {
   const token: any = localStorage.getItem('jwtToken');
   console.log(token);
 
   // const headers = new HttpHeaders({ Authorization: 'Bearer Token ' + btoa(username + ':' + password) });
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + token });
    headers.append('Access-Control-Allow-Origin' , '*');
   // const headers = new HttpHeaders({Authorization: `Bearer ${token.accesstoken}`});
   console.log(headers);
     return this.http.get<Array<Member>>(this.apiGet);
  // return this.http.get<Array<Company>>(this.apiGet,{headers});
  // return this.http.get<Array<Company>>(this.apiGet,{ headers });

  }

  // getMemberById(bid:number):Observable<Member> //Observable<Array<Book>> //Observable<Book>
  // {
  //   //return this.http.get<Array<Book>>(`${this.apiGetById}/${bid}`);
  //   const token: any = localStorage.getItem('jwtToken');
  //   const headers = new HttpHeaders({ Authorization: 'Bearer ' + token });
  //   headers.append('Access-Control-Allow-Origin' , '*');
  //   return this.http.get<Member>(`${this.apiGetById}/${bid}`,{headers});
  // }
  getMemberById():Observable<Member> //Observable<Array<Book>> //Observable<Book>
  {
    //return this.http.get<Array<Book>>(`${this.apiGetById}/${bid}`);
    const token: any = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + token });
    headers.append('Access-Control-Allow-Origin' , '*');
    return this.http.get<Member>(`${this.apiGetById}`,{headers});
  }


  updateMemberDetails(memberObj:Member):Observable<Member>
  {
   const token: any = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + token });
    headers.append('Access-Control-Allow-Origin' , '*');
    return this.http.put<Member>(this.apiUpdate,memberObj,{headers});
  }

  getMemberByName(bname:string):Observable<Array<Member>>
  {
    const token: any = localStorage.getItem('jwtToken');
    console.log(token);
    // const headers = new HttpHeaders({ Authorization: 'Bearer ' + token });
    const headers = new HttpHeaders();
    headers.set( 'Authorization', `Bearer ${token}`);
    //headers.append('content-type','application/json')
    // headers.append('Access-Control-Allow-Origin','*');
    // headers.append('Access-Control-Allow-Methods',' GET, PATCH, PUT, DELETE, OPTIONS');
    console.log(headers);
    // return this.http.get<Array<Member>>(`${this.apigetByMemberName}/${bname}`);
    return this.http.get<Array<Member>>(`${this.apigetByMemberName}/${bname}`,{headers});
  }
}
