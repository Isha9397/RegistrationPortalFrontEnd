import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Dupdate } from './dupdate';
import { DupdateService } from './dupdate.service';

@Component({
  selector: 'app-dupdate',
  templateUrl: './dupdate.component.html',
  styleUrls: ['./dupdate.component.css']
})
export class DupdateComponent implements OnInit {

  @ViewChild('dupdateForm') form: NgForm | any;

  dupdateForm = new FormGroup({
    member_id_fk: new FormControl(''),
    dependentDOB: new FormControl('')
  });
  
  constructor(private dupdateService:DupdateService,private http:HttpClient,private router:Router,private route:ActivatedRoute) 
  {
    this.route.params.subscribe(params => console.log(params))
    //this.route.params.subscribe(params => this.updateDependentForMemberId(params['id']))
    // this.route.params.subscribe(params => this.getDependentsForMember(params['id']))
    this.route.params.subscribe(params => this.getDependentsForMember())
   }

   listData: MatTableDataSource<any> | any;
  ngOnInit(): void {
    // console.log(this.dUpdateOb);
    // this.setValue(this.dUpdateOb.member_id_fk);
  }

  data: {} | any;
  setValue(id: number) {
    console.log(id);
    this.dUpdateOb.member_id_fk = id;
    console.log(this.dUpdateOb);
  }
  dUpdateOb:Dupdate = new Dupdate();
  submitUpdated(dUpdateObj: Dupdate) {
    this.dupdateService.updateDependentDetails(dUpdateObj).subscribe(data => {
      alert("New Records have been updated");
      // this.getCompanyList();
    },
      error => {
        console.log("error " + error);
        alert(error.error.message);
      })
      let route = 'dependent/getDependentsForMemberId';
      console.log(dUpdateObj.member_id_fk);
      console.log(route);
      this.router.navigate(['dependent/getDependentsForMemberId',{ id: dUpdateObj.member_id_fk }])
  }


  updateDependentForMemberId(bid:number,dUpdateOb: Dupdate) {
    console.log(bid);
    console.log(this.dUpdateOb);
    this.dupdateService.updateDependentForMemberId(dUpdateOb).subscribe(data => {
      alert("New Records have been updated");
      // this.getCompanyList();
    },
      error => {
        console.log("error " + error);
        alert(error.error.message);
      })
       let route = 'dependent/getDependentsForMemberId';
      // console.log(dUpdateObj.member_id_fk);
      // console.log(route);
       this.router.navigate(['dependent/getDependentsForMemberId'])
  }

  goToLogout()
  {
    this.router.navigate(['logout'])
  }

  dependentm: Dupdate = new Dupdate();
  dependentData: Array<Dupdate> = [];
  companyId: number | any;
  response: any;
  // getDependentsForMember(bid: number) 
  getDependentsForMember() 
  {
    // console.log(bid);
    //  this.setValue(bid);
    this.dupdateService.getDependentsForMember().subscribe(data => {
      console.log(data);
      this.dependentData = Object.values(data);
      console.log(this.dependentData);
      this.data = JSON.stringify(data);
      this.listData = new MatTableDataSource(this.dependentData);
      console.log(this.listData);
    },
      error => {
        // alert("Record not present");
        console.log(error);
        alert(error.error.message);
      })
  }

}
