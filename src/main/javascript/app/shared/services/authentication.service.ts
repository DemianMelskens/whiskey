import {Injectable} from "@angular/core";
import {TokenService} from "./token.service";
import {Observable} from "rxjs";
import {JwtDto} from "../clients/dtos/user/jwt.dto";
import {map, tap} from "rxjs/operators";
import {AuthenticationClient} from "../clients/authentication.client";
import {UserService} from "./user.service";
import {Role} from "../domain/enums/role.enum";


@Injectable({providedIn: 'root'})
export class AuthenticationService {
    constructor(
        private authenticationClient: AuthenticationClient,
        private userService: UserService,
        private tokenService: TokenService
    ) {
    }

    public isAuthenticated(): Observable<boolean> {
        return this.userService.authenticateUser();
    }

    public isNotAuthenticated(): Observable<boolean> {
        return this.userService.authenticateUser().pipe(
            map(authenticated => !authenticated)
        );
    }

    public hasAuthority(role: Role): boolean {
        return this.userService.getCurrentUser().role === role;
    }

    public authenticate(username: string, password: string): Observable<JwtDto> {
        return this.authenticationClient.authenticate({username, password, rememberMe: false}).pipe(
            tap(jwt => this.tokenService.setToken(jwt.token))
        );
    }

}
