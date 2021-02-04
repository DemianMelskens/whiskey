import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export interface State {
    token: string;
}

let _state: State = {
    token: localStorage.getItem('token') || sessionStorage.getItem('token')
}

@Injectable({providedIn: 'root'})
export class AuthenticationState {
    private _store = new BehaviorSubject<State>(_state);
    public _state$ = this._store.asObservable();

    constructor() {
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

    private updateState(state: State): void {
        this._store.next(_state = state);
    }
}
