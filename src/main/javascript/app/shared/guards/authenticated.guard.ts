import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable, of} from "rxjs";
import {Injectable} from "@angular/core";
import {map, switchMap, tap} from "rxjs/operators";
import {TokenService} from '../services/token.service';
import {UserService} from '../services/user.service';

@Injectable()
export class AuthenticatedGuard implements CanActivate {

    constructor(
        private router: Router,
        private tokenService: TokenService,
        private userService: UserService
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.tokenService.token$.pipe(
            switchMap(token => {
                // eslint-disable-next-line no-console
                console.log('token: ', token);
                return of(token !== null ? true: this.notAuthenticated());
            })
        );
    }

    notAuthenticated() {
        this.tokenService.removeToken();
        this.userService.updateUser(null);
        return this.router.parseUrl('private/auth/login')
    }
}
