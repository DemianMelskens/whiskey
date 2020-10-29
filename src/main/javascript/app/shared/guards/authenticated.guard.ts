import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";
import {tap} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class AuthenticatedGuard implements CanActivate {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.authenticationService.isAuthenticated().pipe(
            tap(authenticated => {
                if (!authenticated) {
                    this.router.navigate(['private', 'login']);
                }
            })
        );
    }
}
