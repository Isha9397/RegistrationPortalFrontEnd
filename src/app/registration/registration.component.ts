import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from './registration.service';
import { Registration } from './registration';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  @ViewChild('registerForm') form: NgForm | any;

  registerForm = new FormGroup({
    username: new FormControl('',Validators.pattern('^(?=.*[A-Z])(?=.*[a-z]).{1,}$')),
    password: new FormControl('',Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{5,}$')),
    contact: new FormControl(''),
    emailId: new FormControl('',Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$')),
    panNumber: new FormControl('',Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{12}$')),
    dateOfBirth: new FormControl(''),
    address: new FormControl(''),
    state: new FormControl(''),
    country: new FormControl(''),
    dependentName: new FormControl(''),
    dependentDOB: new FormControl('')
  });

  
  constructor(private router: Router,private registrationService:RegistrationService) { }
  register:Registration = new Registration();
  data:{}|any;
  registerarr:Array<Registration>=[];

  ngOnInit(): void {
  }

  registerMember()
  {
    console.log(this.register);
    this.registrationService.addUser(this.register).subscribe((data: any)=>
      {
        this.data = JSON.stringify(data);
        console.log(this.data);
        this.registerarr.push(this.data);
        this.router.navigate(['login'])
  },
      (  error: any)=>
  {
    //alert("Please check values");
    console.log(error);
    console.log(error.error);
    alert(error.error.message);
    // alert(error.message);
  })
}
}
