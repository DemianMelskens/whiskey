import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';

export interface TokenState {
    token: string;
}

let _state: TokenState = {
    token: ''
}

@Injectable({providedIn: 'root'})
export class TokenService {
    private _store = new BehaviorSubject<TokenState>(_state);
    private _state$ = this._store.asObservable();

    token$ = this._state$.pipe(map(state => state.token));

    constructor() {
    }

    setToken(token: string): void {
        localStorage.setItem('token', token);
        sessionStorage.setItem('token', token);
    }

    removeToken(): void {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
    }

    getToken(): string {
        return localStorage.getItem('token') || sessionStorage.getItem('token');
    }
}
