import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable, of} from "rxjs";
import {Injectable} from "@angular/core";
import {switchMap} from "rxjs/operators";
import {AuthenticationService} from "../services/authentication.service";

@Injectable()
export class NotAuthenticationGuard implements CanActivate {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.authenticationService.token$.pipe(
            switchMap(token => {
                return of(token === null ? true : this.router.parseUrl('private/admin'));
            })
        );
    }
}
