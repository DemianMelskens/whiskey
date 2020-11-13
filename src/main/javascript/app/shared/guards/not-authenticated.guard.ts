import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable, of} from "rxjs";
import {Injectable} from "@angular/core";
import {map, switchMap, tap} from "rxjs/operators";
import {TokenService} from '../services/token.service';

@Injectable()
export class NotAuthenticationGuard implements CanActivate {

    constructor(
        private router: Router,
        private tokenService: TokenService
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.tokenService.token$.pipe(
            switchMap(token => {
                // eslint-disable-next-line no-console
                console.log('token: ', token);
                return of(token === null ? true : this.router.parseUrl('private/admin'));
            })
        );
    }
}
