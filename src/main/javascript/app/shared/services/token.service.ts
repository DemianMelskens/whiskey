import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';

export interface TokenState {
    token: string;
}

let _state: TokenState = {
    token: localStorage.getItem('token') || sessionStorage.getItem('token')
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
        this.updateState({..._state, token});
    }

    removeToken(): void {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        this.updateState({..._state, token: ''});
    }

    private updateState(state: TokenState): void {
        this._store.next(_state = state);
    }
}
