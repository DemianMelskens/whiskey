import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {distinctUntilChanged, map, tap} from 'rxjs/operators';

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

    token$ = this._state$.pipe(map(state => state.token), distinctUntilChanged(),tap(token => {
        // eslint-disable-next-line no-console
        console.log('token: ', token);
    }));

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
        this.updateState({..._state, token: null});
    }

    private updateState(state: TokenState): void {
        this._store.next(_state = state);
    }
}
