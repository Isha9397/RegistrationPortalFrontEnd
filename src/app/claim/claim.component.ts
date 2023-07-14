import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Claim } from './claim';
import { ClaimService } from './claim.service';

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css']
})
export class ClaimComponent implements OnInit {

  @ViewChild('claimForm') form: NgForm | any;

  claimForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    dateOfBirth: new FormControl(''),
    dateOfAdmission: new FormControl(''),
    dateOfDischarge: new FormControl(''),
    providerName: new FormControl(''),
    billAmount: new FormControl(''),
    memberId: new FormControl('')
  });
  
  constructor(private router: Router,private claimService:ClaimService,private route:ActivatedRoute) 
  {
    this.route.params.subscribe(params => console.log(params))
    this.route.params.subscribe(params => this.getDependentsForMember(params['id']))
   }
  claim:Claim = new Claim();
  data:{}|any;
  claimarr:Array<Claim>=[];

  listData: MatTableDataSource<any> | any;
  ngOnInit(): void {
  }

  setValue(id: number) {
    console.log(id);
    this.claim.memberId = id;
    console.log(this.claim);
  }
  submitClaim() 
  {
    console.log(this.claim);
    this.claimService.addUser(this.claim).subscribe((data: any) => {
      this.data = JSON.stringify(data);
      console.log(this.data);
      this.claimarr.push(this.data);
      window.location.reload();
    },
      (error: any) => {
        //alert("Please check values");
        console.log(error);
        alert(error.error.message);
      })
  }

  claimm: Claim = new Claim();
  claimData: Array<Claim> = [];
  companyId: number | any;
  response: any;
  getDependentsForMember(bid: number) 
  {
    console.log(bid);
    this.setValue(bid);
    this.claimService.getClaimForMember(bid).subscribe(data => {
      console.log(data);
      this.claimData = Object.values(data);
      console.log(this.claimData);
      this.data = JSON.stringify(data);
      this.listData = new MatTableDataSource(this.claimData);
      console.log(this.listData);
    },
      error => {
        // alert("Record not present");
        console.log(error);
        alert(error.error.message);
      })
  }

  goToLogout() {
    this.router.navigate(['logout'])
  }

}
