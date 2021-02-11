import {Bottler} from '../models/bottler.model';
import {Pagination} from '../../../shared/domain/pagination.model';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export interface State {
    bottlers: Bottler[];
    pagination: Pagination;
    criteria: string;
}

let _state: State = {
    bottlers: [],
    pagination: {
        currentPage: 0,
        pageSize: 20,
        pageSizes: [10, 20, 50, 100],
        totalPages: 0
    },
    criteria: ''
}

@Injectable({providedIn: 'root'})
export class BottlerState {
    private _store = new BehaviorSubject<State>(_state);
    public _state$ = this._store.asObservable();

    constructor() {
    }

    public getSnapshot(): State {
        return {..._state};
    }

    public updateBottles(bottlers: Bottler[]): void {
        this.updateState({..._state, bottlers});
    }

    public updatePagination(pagination: Pagination): void {
        this.updateState({..._state, pagination});
    }

    public updateSearchCriteria(criteria: string): void {
        this.updateState({..._state, criteria});
    }

    public updatePageSize(pageSize: number): void {
        const pagination = {..._state.pagination, pageSize};
        this.updateState({..._state, pagination});
    }

    public updateCurrentPage(currentPage: number = 0): void {
        const pagination = {..._state.pagination, currentPage};
        this.updateState({..._state, pagination});
    }

    private updateState(state: State): void {
        this._store.next(_state = state);
    }
}
