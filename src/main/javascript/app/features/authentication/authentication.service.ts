import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {JwtDto} from "./clients/dtos/jwt.dto";
import {tap} from "rxjs/operators";
import {AuthenticationClient} from "./clients/authentication.client";
import {Router} from '@angular/router';
import {AuthenticationState} from './state/authentication.state';


@Injectable({providedIn: 'root'})
export class AuthenticationService {
    public token$ = this.authenticationState.token$;

    constructor(
        private router: Router,
        private authenticationClient: AuthenticationClient,
        private authenticationState: AuthenticationState
    ) {
    }

    public authenticate(username: string, password: string): Observable<JwtDto> {
        return this.authenticationClient.authenticate({username, password, rememberMe: false}).pipe(
            tap(jwt => {
                this.setToken(jwt.token)
            })
        );
    }

    public register(username: string, email: string, password: string, firstName: string, lastName: string): Observable<string> {
        return this.authenticationClient.register({username, email, password, firstName, lastName});
    }

    public setToken(token: string): void {
        this.authenticationState.setToken(token);
    }

    public removeToken(): void {
        this.authenticationState.removeToken();
    }
}
