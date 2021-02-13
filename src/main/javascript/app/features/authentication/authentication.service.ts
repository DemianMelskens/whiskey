import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import {AuthenticationClient} from "./clients/authentication.client";
import {Router} from '@angular/router';
import {AuthenticationState} from './state/authentication.state';
import {Register} from './models/register.model';
import {Login} from './models/login.model';


@Injectable({providedIn: 'root'})
export class AuthenticationService {
    public token$ = this.authenticationState.token$;
    public authenticated$ = this.authenticationState.authenticated$;

    private login$$ = new Subject<Login>()
    private login$ = this.login$$.asObservable();

    private register$$ = new Subject<Register>();
    private register$ = this.register$$.asObservable();

    constructor(
        private router: Router,
        private authenticationClient: AuthenticationClient,
        private authenticationState: AuthenticationState
    ) {
        this.login$.pipe(
            switchMap((login) =>
                this.authenticationClient.authenticate({
                    username: login.username,
                    password: login.password,
                    rememberMe: false
                }))
        ).subscribe(jwt => {
            this.setToken(jwt.token);
        });

        this.register$.pipe(
            switchMap((register) => this.authenticationClient.register(register))
        ).subscribe(() => {
            this.router.navigate(['/auth/login'])
        });
    }

    public login(username: string, password: string): void {
        this.login$$.next({username, password});
    }

    public register(register: Register): void {
        this.register$$.next(register);
    }

    public setToken(token: string): void {
        this.authenticationState.setToken(token);
    }

    public removeToken(): void {
        this.authenticationState.removeToken();
    }
}
