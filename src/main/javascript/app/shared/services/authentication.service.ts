import {Injectable} from "@angular/core";
import {TokenService} from "./token.service";
import {Observable} from "rxjs";
import {JwtDto} from "../clients/dtos/user/jwt.dto";
import {map, tap} from "rxjs/operators";
import {AuthenticationClient} from "../clients/authentication.client";
import {UserService} from "./user.service";
import {Role} from "../domain/enums/role.enum";
import {Router} from '@angular/router';


@Injectable({providedIn: 'root'})
export class AuthenticationService {
    constructor(
        private router: Router,
        private userService: UserService,
        private tokenService: TokenService,
        private authenticationClient: AuthenticationClient
    ) {
    }

    public isAuthenticated(): Observable<boolean> {
        return this.userService.currentUser$.pipe(
            map(user => user !== null)
        );
    }

    public isNotAuthenticated(): Observable<boolean> {
        return this.isAuthenticated().pipe(
            map(authenticated => !authenticated)
        );
    }

    public hasAuthority(role: Role): Observable<boolean> {
        return this.userService.currentUser$.pipe(
            map(user => role === user.role)
        );
    }

    public authenticate(username: string, password: string): Observable<JwtDto> {
        return this.authenticationClient.authenticate({username, password, rememberMe: false}).pipe(
            tap(jwt => this.tokenService.setToken(jwt.token))
        );
    }

    public logout(): void {
        this.tokenService.removeToken();
        this.router.navigate(['/private/auth/login'])
    }
}
