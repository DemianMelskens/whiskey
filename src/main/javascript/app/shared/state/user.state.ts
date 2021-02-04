import {Injectable} from '@angular/core';
import {User} from '../domain/user.model';
import {BehaviorSubject} from 'rxjs';

export interface State {
    user: User;
}

let _state: State = {
    user: null
}

@Injectable({providedIn: 'root'})
export class UserState {
    private _store = new BehaviorSubject<State>(_state);
    public _state$ = this._store.asObservable();

    constructor() {
    }

    public updateUser(user: User | null): void {
        this.updateState({..._state, user});
    }

    private updateState(state: State): void {
        this._store.next(_state = state);
    }
}
