import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {distinctUntilChanged, pluck} from 'rxjs/operators';

export interface LoadingState {
    loading: boolean;
}

let _state: LoadingState = {
    loading: false
}

@Injectable({providedIn: 'root'})
export class LoadingService {
    private _store = new BehaviorSubject<LoadingState>(_state);
    private _state$ = this._store.asObservable();

    public loading$ = this._state$.pipe(pluck('loading'), distinctUntilChanged());

    changeLoading(loading: boolean): void {
        this.updateState({loading})
    }

    private updateState(state: LoadingState) {
        this._store.next(_state = state);
    }
}
