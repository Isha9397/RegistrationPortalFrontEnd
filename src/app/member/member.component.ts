import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MemberService } from './member.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Member } from './member';

export interface UserData {
  id: number;
  username: string;
  password: string;
  contact: string;
  emailId: string;
}

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  listData: MatTableDataSource<any> | any;
  searchText:string | any;
  dataSource: MatTableDataSource<UserData>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild('memberForm') form: NgForm | any;
  public departmentId: any|any;
  constructor(private memberService:MemberService, private http:HttpClient,private router:Router,private route:ActivatedRoute)
   {
    this.dataSource = new MatTableDataSource();
    this.route.params.subscribe(params => console.log(params))
    this.route.params.subscribe(params => this.getMemberByName(params['username']))
    }

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  
   //displayedCol=['username','password','companyCEO','companyTurnOver','companyWebsite','excahngeName','stockPrice']
  ngOnInit(): void {
    // this.getMemberList();
    //this.getMemberByName(Member);

    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = (params.get('id'));
      this.departmentId = id;
    });
  }

  memberOb:Member = new Member();
  memberArr:Array<Member>=[];
  public selectedName:any;
  data:{}|any;

  getMemberList()
  {
    this.memberService.getAll().subscribe(data=>
      {
        this.memberArr = Object.values(data);
       console.log(this.memberArr);
      },
      error=>
      {
        console.log(error);
        alert(error.error.message);
      })
  }

  updateCourse(id: number, memberObj: Member) 
  {
    console.log(id);
    let current = this.memberArr.find((c) => { return c.id === id });
    console.log(current);
    this.form.setValue({
      emailId: current?.emailId,
      panNumber: current?.panNumber,
      address: current?.address,
      contact: current?.contact,
    });
    alert("Please Update record");
  }

  submitUpdated(memberObj: Member) {
    this.memberService.updateMemberDetails(memberObj).subscribe(data => {
      alert("New Records have been updated");
      window.location.reload();
      // this.getCompanyList();
    },
      error => {
        console.log("error " + error);
        alert(error.error.message);
      })
  }

      getStockRouting(companyCode:number)
      {
        // this.router.navigate(['/stock:companyCode'])
        //  this.router.navigate(['stock',companyCode])
         this.router.navigate(['stock/getAllStocks',companyCode])
      }

  memberm: Member = new Member();
  memberData: Array<Member> = [];
  response: any;
  getMemberById(bid: number) {
    console.log(this.memberArr);
    if (bid != null) {
      // this.memberService.getMemberById(this.memberm.id).subscribe(data => {
        this.memberService.getMemberById().subscribe(data => {
        this.memberArr = Object.values(data);
        console.log(this.memberArr);

        alert(this.memberArr);
        window.location.reload();
      })
    }
  }

  editContact() {
    // let route = "['/stock/getAllStocks',contact]";
    let route = '/dependent/getDependentsForMemberId';

    //console.log(contact);
    //let route = '/stock';
    console.log(route);

    // this.router.navigate([route], { queryParams: { companyCode: contact.companyCode } });
    // this.router.navigate(['dependent/getDependentsForMemberId', { id: contact }]);
    this.router.navigate(['dependent/getDependentsForMemberId']);
  }

  memberGetm: Member = new Member();
  memberGetData: Array<Member> = [];
  companyId: number | any;
 
  getMemberByName(bname: string) 
  {
    console.log(bname);
    // this.setValue(bid);
    this.memberService.getMemberByName(bname).subscribe(data => {
      console.log(data);
      this.memberGetData = Object.values(data);
      console.log(this.memberGetData);
      this.data = JSON.stringify(data);
      this.listData = new MatTableDataSource(this.memberGetData);
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

  memToClaim:Member = new Member();
  // goToClaim(memId:Member)
  goToClaim()
  {
    // this.router.navigate(['claim'])
    let route = '/member/GetClaimByMemberId';

    //console.log(memId);
    //let route = '/stock';
    console.log(route);
    // this.router.navigate(['member/GetClaimByMemberId',{ id: memId }])
    this.router.navigate(['member/GetClaimByMemberId'])
  }

  goToUpdateMember(memId:number)
  {
    // this.router.navigate(['mupdate'])
    console.log(memId)
    let route = '/mupdate/getMemberById';
    console.log(route);
    //this.router.navigate(['dupdate/updateDependentForMemberId',{ id: memId }])
    // this.router.navigate(['mupdate/getMemberById', { id: memId }]);
    this.router.navigate(['mupdate/getMemberById']);
  }

}
