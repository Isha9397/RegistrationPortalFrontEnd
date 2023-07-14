import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatFormFieldModule } from '@angular/material/form-field';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule } from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { MemberComponent } from './member/member.component';
import { DependentComponent } from './dependent/dependent.component';
import { SerachFilterPipe } from 'search-filter.pipe';
import { TokenInterceptor } from './TokenInterceptor/token-interceptor';
import { ClaimComponent } from './claim/claim.component';
import { MupdateComponent } from './mupdate/mupdate.component';
import { DupdateComponent } from './dupdate/dupdate.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    LogoutComponent,
    MemberComponent,
    DependentComponent,
    SerachFilterPipe,
    ClaimComponent,
    MupdateComponent,
    DupdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
