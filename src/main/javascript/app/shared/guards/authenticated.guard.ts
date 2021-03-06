import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable, of} from "rxjs";
import {Injectable} from "@angular/core";
import {switchMap} from "rxjs/operators";
import {UserService} from '../services/user.service';
import {AuthenticationService} from "../../features/authentication/authentication.service";

@Injectable()
export class AuthenticatedGuard implements CanActivate {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.authenticationService.token$.pipe(
            switchMap(token => {
                return of(token !== null ? true : this.notAuthenticated());
            })
        );
    }

    notAuthenticated() {
        this.userService.logout();
        return this.router.parseUrl('private/auth/login')
    }
}
