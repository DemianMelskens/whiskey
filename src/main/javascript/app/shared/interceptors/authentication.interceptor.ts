import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenService} from "../services/token.service";
import {environment} from "../../../environments/environment";
import {map, switchMap} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class AuthenticationInterceptor implements HttpInterceptor {

    constructor(private tokenService: TokenService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.tokenService.token$.pipe(
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
