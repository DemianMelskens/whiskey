import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable, of} from "rxjs";
import {Injectable} from "@angular/core";
import {switchMap, tap} from "rxjs/operators";
import {TokenService} from '../services/token.service';
import {UserService} from '../services/user.service';

@Injectable({providedIn: 'root'})
export class AuthenticatedGuard implements CanActivate {

    constructor(
        private router: Router,
        private tokenService: TokenService,
        private userService: UserService
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.tokenService.token$.pipe(
            switchMap(token => of(token !== null)),
            tap(authenticated => {
                if (!authenticated) {
                    this.tokenService.removeToken();
                    this.userService.updateUser(null);
                    this.router.navigate(['private', 'auth', 'login']);
                }
            })
        );
    }
}
