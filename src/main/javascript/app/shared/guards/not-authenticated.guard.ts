import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";
import {tap} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class NotAuthenticationGuard implements CanActivate {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.authenticationService.isNotAuthenticated().pipe(
            tap(notAuthenticated => {
                if (!notAuthenticated) {
                    this.router.navigate(['private', 'admin']);
                }
            })
        );
    }
}
