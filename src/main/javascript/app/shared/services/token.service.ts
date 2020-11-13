import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {distinctUntilChanged, map} from 'rxjs/operators';

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

    token$ = this._state$.pipe(map(state => state.token), distinctUntilChanged());

    constructor() {
    }

    public getSnapshot(): TokenState {
        return _state;
    }

    public setToken(token: string): void {
        // eslint-disable-next-line no-console
        console.log('token is set to:', token);
        localStorage.setItem('token', token);
        sessionStorage.setItem('token', token);
        this.updateState({..._state, token});
    }

    public removeToken(): void {
        // eslint-disable-next-line no-console
        console.log('token is removed');
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        this.updateState({..._state, token: null});
    }

    private updateState(state: TokenState): void {
        this._store.next(_state = state);
    }
}
