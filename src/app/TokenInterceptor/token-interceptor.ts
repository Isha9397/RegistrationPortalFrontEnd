import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthenticationService } from "../service/authentication.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(public auth: AuthenticationService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = this.auth.getToken();
      request = request.clone({
        setHeaders: {
          Authorization: "Bearer " + authToken
        }
      });
      console.log(request);
      return next.handle(request);
    }
  }{
}
