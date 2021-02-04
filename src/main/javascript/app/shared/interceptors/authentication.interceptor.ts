import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {switchMap} from "rxjs/operators";
import {AuthenticationService} from "../../features/authentication/authentication.service";

@Injectable({providedIn: 'root'})
export class AuthenticationInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authenticationService.token$.pipe(
            switchMap(token => {
                if (!request || !request.url || (request.url.startsWith('http') && !(environment.apiUrl && request.url.startsWith(environment.apiUrl)))) {
                    return next.handle(request);
                }

                if (token) {
                    request = request.clone({
                        setHeaders: {
                            Authorization: 'Bearer ' + token
                        }
                    });
                }

                return next.handle(request);
            })
        );
    }
}
