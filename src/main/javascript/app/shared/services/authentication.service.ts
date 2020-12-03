import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {JwtDto} from "../clients/dtos/user/jwt.dto";
import {distinctUntilChanged, map, tap} from "rxjs/operators";
import {AuthenticationClient} from "../clients/authentication.client";
import {Router} from '@angular/router';

export interface AuthenticationState {
    token: string;
}

let _state: AuthenticationState = {
    token: localStorage.getItem('token') || sessionStorage.getItem('token')
}


@Injectable({providedIn: 'root'})
export class AuthenticationService {
    private _store = new BehaviorSubject<AuthenticationState>(_state);
    private _state$ = this._store.asObservable();

    public token$ = this._state$.pipe(map(state => state.token), distinctUntilChanged());

    constructor(
        private router: Router,
        private authenticationClient: AuthenticationClient
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
        localStorage.setItem('token', token);
        sessionStorage.setItem('token', token);
        this.updateState({..._state, token});
    }

    public removeToken(): void {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        this.updateState({..._state, token: null});
    }

    private updateState(state: AuthenticationState): void {
        this._store.next(_state = state);
    }
}
