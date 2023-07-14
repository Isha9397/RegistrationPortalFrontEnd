import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Dependent } from './dependent';
import { DependentService } from './dependent.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-dependent',
  templateUrl: './dependent.component.html',
  styleUrls: ['./dependent.component.css']
})
export class DependentComponent implements OnInit {

  @ViewChild('dependentForm') form: NgForm | any;

  dependentForm = new FormGroup({
    contact: new FormControl(''),
    emailId: new FormControl('',Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$')),
    dependentDOB: new FormControl(''),
    member_id_fk: new FormControl('')
  });

  constructor(private http: HttpClient, private dependentService: DependentService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => console.log(params))
    this.route.params.subscribe(params => this.getDependentsForMember(params['id']))
    //this.route.params.subscribe(params=>this.getAllStocks())

  }
  // dtOptions: DataTables.Settings = {};
  listData: MatTableDataSource<any> | any;

  jobForm = new FormGroup({
    contact: new FormControl(''),
    emailId: new FormControl(''),
    member_id_fk: new FormControl(''),
    dependentDOB: new FormControl(''),
  });
  preview: string = '';
  ngOnInit(): void {}

  save() {
    this.preview = JSON.stringify(this.jobForm.value);
  }

  dependentObj: Dependent = new Dependent();
  dependentList: Array<Dependent> = [];
  data: {} | any;
  displayedColumns: string[] = ['id', 'contact', 'emailId', 'member_id_fk', 'dependentDOB'];

  setValue(id: number) {
    console.log(id);
    this.dependentObj.member_id_fk = id;
    console.log(this.dependentObj);
  }
  
  addDependent() 
  {
    // const token: any = localStorage.getItem('jwtToken');
    // console.log("token in ts is --" + token);
    // const decoded = jwt_decode(token);
    // console.log(decoded);
    // const fetchedId = this.decoded.id;
    // console.log(fetchedId);
 //   this.dependentObj.member_id_fk=fetchedId;

    console.log(this.dependentObj);
    // this.setValue(bid);
    this.dependentService.addDependent(this.dependentObj).subscribe(data => {
      this.data = JSON.stringify(data);
      this.dependentList.push(this.data);
      alert("Dependent data added");
      window.location.reload();
    },
    error => {
      alert(error.error.message);
      console.log(error);
      //window.location.reload();
    })

  }

  dependentm: Dependent = new Dependent();
  dependentData: Array<Dependent> = [];
  companyId: number | any;
  response: any;
  decoded: any;
  getDependentsForMember(bid: number) 
  {
    console.log(bid);
     this.setValue(bid);
    this.dependentService.getDependentsForMember().subscribe(data => {
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

  goToLogout() 
  {
    this.router.navigate(['logout'])
  }

  updateDependentDetails(id: number, dependentObj: Dependent) 
  {
    console.log(id);
    let current = this.dependentData.find((c) => { return c.member_id_fk === id });
    console.log(current);
    // this.form.setValue({
    this.dependentForm.setValue({
      contact: current?.contact,
      emailId: current?.emailId,
      member_id_fk: current?.member_id_fk,
      dependentDOB: current?.dependentDOB
    });
    alert("Please Update record");
  }

  submitUpdated(dependentObj: Dependent) 
  {
    this.dependentService.updateDependentDetails(dependentObj).subscribe(data => {
      alert("New Records have been updated");
      window.location.reload();
      // this.getCompanyList();
    },
      error => {
        console.log("error " + error);
        alert(error.error.message);
      })
  }

  // goToUpdateDependent(dependentObj:Dependent)
  // {
  //   console.log(dependentObj)
  //   // let route = '/member/GetClaimByMemberId';
  //   this.router.navigate(['dupdate'])
  // }

  goToUpdateDependent(memId:Dependent)
  {
    console.log(memId)
    let route = '/dupdate/updateDependentForMemberId';
    console.log(route);
    //this.router.navigate(['dupdate/updateDependentForMemberId',{ id: memId }])
    // this.router.navigate(['dupdate/getDependentsForMemberId', { id: memId }]);
    this.router.navigate(['dupdate/getDependentsForMemberId']);
  }
}