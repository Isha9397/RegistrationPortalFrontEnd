import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClaimComponent } from './claim/claim.component';
import { DependentComponent } from './dependent/dependent.component';
import { DupdateComponent } from './dupdate/dupdate.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { MemberComponent } from './member/member.component';
import { MupdateComponent } from './mupdate/mupdate.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGaurdService } from './service/auth-gaurd.service';

const routes: Routes = [
  { path: 'registration', component: RegistrationComponent },
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGaurdService] },
  { path: 'member', component: MemberComponent, canActivate: [AuthGaurdService] },
  { path: 'dependent/getDependentsForMemberId', component: DependentComponent, canActivate: [AuthGaurdService] },
  { path: 'user/getByMemberName', component: MemberComponent, canActivate: [AuthGaurdService] },
  { path: 'claim', component: ClaimComponent },
  { path: 'member/GetClaimByMemberId', component: ClaimComponent },
  { path: 'user/getMemberById', component: MemberComponent },
  { path: 'mupdate', component: MupdateComponent },
  { path: 'mupdate/getMemberById', component: MupdateComponent },
  { path: 'dupdate', component: DupdateComponent },
  { path: 'dupdate/updateDependentForMemberId', component: DupdateComponent },
  { path: 'dupdate/getDependentsForMemberId', component: DupdateComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
