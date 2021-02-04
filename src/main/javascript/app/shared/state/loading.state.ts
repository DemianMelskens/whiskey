import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export interface State {
    loading: boolean;
}

let _state: State = {
    loading: false
}

@Injectable({providedIn: 'root'})
export class LoadingState {
    private _store = new BehaviorSubject<State>(_state);
    public _state$ = this._store.asObservable();

    constructor() {
    }

    changeLoading(loading: boolean): void {
        this.updateState({loading})
    }

    private updateState(state: State): void {
        this._store.next(_state = state);
    }
}
