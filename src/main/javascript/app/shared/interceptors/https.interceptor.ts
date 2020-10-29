import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({providedIn: 'root'})
export class HttpsInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (environment.enableHttps) {
            const secureRequest = request.clone({
                url: request.url.replace('http://', 'https://')
            })
            return next.handle(secureRequest);
        }
        return next.handle(request);
    }
}
