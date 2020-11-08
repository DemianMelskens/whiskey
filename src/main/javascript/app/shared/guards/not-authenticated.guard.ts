import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable, of} from "rxjs";
import {Injectable} from "@angular/core";
import {switchMap, tap} from "rxjs/operators";
import {TokenService} from '../services/token.service';

@Injectable({providedIn: 'root'})
export class NotAuthenticationGuard implements CanActivate {

    constructor(
        private router: Router,
        private tokenService: TokenService
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.tokenService.token$.pipe(
            switchMap(token => of(token !== null)),
            tap(authenticated => {
                // eslint-disable-next-line no-console
                console.log('not authenticated: ', !authenticated);
                if (authenticated) {
                    this.router.navigate(['private', 'admin']);
                }
            })
        );
    }
}
