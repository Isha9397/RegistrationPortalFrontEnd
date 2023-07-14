import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Mupdate } from './mupdate';
import { MupdateService } from './mupdate.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-mupdate',
  templateUrl: './mupdate.component.html',
  styleUrls: ['./mupdate.component.css']
})
export class MupdateComponent implements OnInit {

  @ViewChild('mupdateForm') form: NgForm | any;

  mupdateForm = new FormGroup({
    id: new FormControl(''),
    username: new FormControl('', Validators.pattern('^(?=.*[A-Z])(?=.*[a-z]).{1,}$')),
    password: new FormControl('', Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{5,}$')),
    contact: new FormControl(''),
    emailId: new FormControl('', Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$')),
    panNumber: new FormControl('', Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{12}$')),
    dateOfBirth: new FormControl(''),
    address: new FormControl(''),
    state: new FormControl(''),
    country: new FormControl(''),
    dependentName: new FormControl(''),
    dependentDOB: new FormControl('')
  });

  constructor(private mupdateService: MupdateService, private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => console.log(params))
    // this.route.params.subscribe(params => this.getMemberById(params['id']))
    this.route.params.subscribe(params => this.getMemberById())
  }

  ngOnInit(): void {
  }

  setValue(id: number) {
    console.log(id);
    this.mUpdateOb.id = id;
    console.log(this.mUpdateOb);
  }

  mUpdateOb: Mupdate = new Mupdate();
  submitUpdated(mUpdateObj: Mupdate) {

    console.log(mUpdateObj);

    this.mupdateService.updateMemberDetails(mUpdateObj).subscribe(data => {
      alert("New Records have been updated");
      // this.getCompanyList();
    },
      error => {
        console.log("error " + error);
        alert(error.error.message);
      })
    let route = 'user/getByMemberName';
    console.log(mUpdateObj.username);
    console.log(route);
    this.router.navigate(['user/getByMemberName', { username: mUpdateObj.username }])
  }

  memberm: Mupdate = new Mupdate();
  memberData: Array<Mupdate> = [];
  memberArr: Array<Mupdate> = [];
  response: any;
  decoded: any;
  getMemberById() {
    // console.log(this.mUpdateOb);
    // console.log(bid);
    // this.setValue(bid);
    // if (bid != null) {
    // this.mupdateService.getMemberById(this.memberm.id).subscribe(data => {
    this.mupdateService.getMemberById().subscribe(data => {
      this.memberArr = Object.values(data);
    })
    // }
  }

  goToLogout() {
    this.router.navigate(['logout'])
  }

}
