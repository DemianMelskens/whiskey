import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {distinctUntilChanged, map, pluck, switchMap} from "rxjs/operators";
import {AuthenticationClient} from "./clients/authentication.client";
import {Router} from '@angular/router';
import {AuthenticationState} from './state/authentication.state';
import {Register} from "./models/register.model";


@Injectable({providedIn: 'root'})
export class AuthenticationService {

    //event subjects
    private readonly _onLogin$$ = new Subject<{ username: string, password: string }>();
    private readonly _onRegister$$ = new Subject<Register>();

    public token$ = this.authenticationState.state.pipe(pluck('token'), distinctUntilChanged());
    public authenticated$ = this.token$.pipe(
        map(token => token !== null)
    );

    constructor(
        private router: Router,
        private authenticationClient: AuthenticationClient,
        private authenticationState: AuthenticationState,
    ) {
        this._onLogin$$.pipe(
            switchMap(login => this.authenticationClient.authenticate({...login, rememberMe: false}))
        ).subscribe(jwt => {
            this.setToken(jwt.token);
            this.router.navigate(['/bottles']);
        });

        this._onRegister$$.pipe(
            switchMap(register => this.authenticationClient.register(register))
        ).subscribe(
            () => this.router.navigate(['/auth/login'])
        );
    }

    public login(username: string, password: string): void {
        this._onLogin$$.next({username, password});
    }

    public logout(): void {
        this.removeToken();
    }

    public register(register: Register): void {
        this._onRegister$$.next(register);
    }

    private setToken(token: string): void {
        this.authenticationState.setToken(token);
    }

    private removeToken(): void {
        this.authenticationState.removeToken();
    }
}
