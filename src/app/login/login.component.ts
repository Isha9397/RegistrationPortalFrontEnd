import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { Login } from './login';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = ''
  password = ''
  invalidLogin = false

  constructor(private router: Router,
    private authenticateservice: AuthenticationService, private loginService:LoginService) { }

  ngOnInit() {
  }
  
  loginOb:Login = new Login();
  checkLogin(name: Login) {
    this.loginService.postLogin(this.loginOb).subscribe((response: any) => {
      alert(response.message);
      localStorage.setItem('jwtToken', response.token);
      //sessionStorage.setItem('jwtToken',response.token);
      // this.router.navigate(['member'])

      let route = 'user/getByMemberName';
      console.log(name);
      console.log(route);
      this.router.navigate(['user/getByMemberName', { username: name }]);
      //}
    })
  }

  ifNotRegister()
  {
    this.router.navigate(['registration'])
  }

  
}
